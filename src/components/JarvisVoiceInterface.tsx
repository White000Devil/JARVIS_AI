import { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JarvisVoiceInterfaceProps {
  onCommand: (command: string) => void;
  isProcessing: boolean;
}

const JarvisVoiceInterface = ({ onCommand, isProcessing }: JarvisVoiceInterfaceProps) => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [isSetup, setIsSetup] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const conversation = useConversation({
    onConnect: () => {
      console.log('JARVIS Voice connected');
      toast({
        title: "JARVIS Online",
        description: "Voice interface is now active. Say 'Hey JARVIS' to start.",
      });
    },
    onDisconnect: () => {
      console.log('JARVIS Voice disconnected');
      toast({
        title: "JARVIS Offline",
        description: "Voice interface disconnected.",
        variant: "destructive",
      });
    },
    onMessage: (message) => {
      console.log('Voice message:', message);
      if (message.message && message.source === 'user') {
        onCommand(message.message);
      }
    },
    onError: (error) => {
      console.error('Voice error:', error);
      toast({
        title: "Voice Error",
        description: "Voice interface encountered an error.",
        variant: "destructive",
      });
    },
    overrides: {
      agent: {
        prompt: {
          prompt: `You are JARVIS, an advanced AI cybersecurity assistant. You can help with:
          - Domain vulnerability scanning
          - OWASP Top 10 security assessments
          - SSL certificate analysis
          - Security headers checking
          - Network reconnaissance
          
          When users give commands, respond briefly and then execute the requested security scan.
          Supported commands:
          - "Scan domain [domain]"
          - "Check SSL for [domain]"
          - "Run OWASP assessment on [target]"
          - "Analyze security headers for [website]"
          - "Perform reconnaissance on [target]"
          
          Always be concise and professional in your responses.`
        },
        firstMessage: "JARVIS voice interface online. How may I assist with your cybersecurity needs?",
        language: "en",
      },
      tts: {
        voiceId: "onwK4e9ZLuTAKqWW03F9" // Daniel voice
      }
    }
  });

  const setupVoice = async () => {
    if (!apiKey.trim() || !agentId.trim()) {
      toast({
        title: "Credentials Required",
        description: "Please enter both your ElevenLabs API key and Agent ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Store credentials for later use
      localStorage.setItem('elevenlabs_api_key', apiKey);
      localStorage.setItem('elevenlabs_agent_id', agentId);
      
      // For now, just mark as setup - actual connection will happen on start
      setIsSetup(true);
      toast({
        title: "Voice Setup Complete",
        description: "Click 'Start Voice' to begin voice interaction.",
      });
    } catch (error) {
      console.error('Voice setup error:', error);
      toast({
        title: "Setup Failed",
        description: "Failed to initialize voice interface.",
        variant: "destructive",
      });
    }
  };

  const toggleVoice = async () => {
    if (conversation.status === "connected") {
      await conversation.endSession();
    } else {
      try {
        const storedApiKey = localStorage.getItem('elevenlabs_api_key');
        const storedAgentId = localStorage.getItem('elevenlabs_agent_id');
        
        if (!storedApiKey || !storedAgentId) {
          toast({
            title: "Missing Credentials",
            description: "Please setup your ElevenLabs credentials first.",
            variant: "destructive",
          });
          return;
        }

        // For demo purposes, we'll simulate voice connection
        toast({
          title: "Voice Demo Mode",
          description: "Voice interface simulation started. Use the chatbox below for commands.",
        });
      } catch (error) {
        console.error('Voice connection error:', error);
        toast({
          title: "Connection Failed",
          description: "Unable to connect to voice service.",
          variant: "destructive",
        });
      }
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    if (conversation.status === "connected") {
      await conversation.setVolume({ volume: newVolume });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5" />
          JARVIS Voice Interface
          <Badge variant={conversation.status === "connected" ? "default" : "secondary"}>
            {conversation.status === "connected" ? "Online" : "Offline"}
          </Badge>
        </CardTitle>
        <CardDescription>
          Voice-controlled cybersecurity scanning and analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSetup && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">ElevenLabs API Key</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Agent ID (Optional)</label>
              <Input
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Your ElevenLabs Agent ID"
                className="mt-1"
              />
            </div>
            <Button onClick={setupVoice} className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Initialize Voice Interface
            </Button>
          </div>
        )}

        {isSetup && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button
                onClick={toggleVoice}
                variant={conversation.status === "connected" ? "destructive" : "default"}
                className="flex-1"
              >
                {conversation.status === "connected" ? (
                  <>
                    <MicOff className="h-4 w-4 mr-2" />
                    Stop Voice
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4 mr-2" />
                    Start Voice
                  </>
                )}
              </Button>
              
              {conversation.isSpeaking && (
                <Badge variant="outline" className="animate-pulse">
                  JARVIS Speaking...
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Volume: {Math.round(volume * 100)}%</label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {isProcessing && (
              <div className="bg-primary/10 p-3 rounded-lg">
                <p className="text-sm text-primary font-medium">
                  🔍 Processing security scan...
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Voice Commands:</h4>
          <ul className="text-xs space-y-1 text-muted-foreground">
            <li>• "Scan domain example.com"</li>
            <li>• "Check SSL for domain.com"</li>
            <li>• "Run OWASP assessment on target.com"</li>
            <li>• "Analyze security headers for site.com"</li>
            <li>• "Perform reconnaissance on target.com"</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default JarvisVoiceInterface;