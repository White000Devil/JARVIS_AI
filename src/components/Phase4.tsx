import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Rocket, Mic, Camera, Monitor, Move, CheckCircle, Clock, Settings, MessageSquare, Eye, Hand, Volume2 } from 'lucide-react';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  tech: string;
}

interface ModalityStatus {
  name: string;
  icon: any;
  status: 'active' | 'inactive';
  description: string;
}

const Phase4 = () => {
  const [setupProgress, setSetupProgress] = useState(100);
  const [voiceInput, setVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const setupSteps: SetupStep[] = [
    {
      id: 'voice-interface',
      title: 'Voice Interface System',
      description: 'Speech recognition and text-to-speech integration',
      status: 'completed',
      tech: 'Web Speech API + ElevenLabs'
    },
    {
      id: 'visual-processing',
      title: 'Visual Input Processing',
      description: 'Camera integration and real-time image analysis',
      status: 'completed',
      tech: 'MediaDevices API + Computer Vision'
    },
    {
      id: 'gesture-control',
      title: 'Gesture Recognition',
      description: 'Hand tracking and gesture-based controls',
      status: 'completed',
      tech: 'MediaPipe + TensorFlow.js'
    },
    {
      id: 'adaptive-ui',
      title: 'Adaptive User Interface',
      description: 'Context-aware UI that adapts to user preferences',
      status: 'completed',
      tech: 'React + Dynamic Components'
    },
    {
      id: 'multimodal-fusion',
      title: 'Multimodal Data Fusion',
      description: 'Combine inputs from multiple modalities',
      status: 'completed',
      tech: 'Custom Fusion Engine'
    }
  ];

  const modalityStatuses: ModalityStatus[] = [
    {
      name: 'Voice',
      icon: Mic,
      status: 'active',
      description: 'Speech recognition and synthesis'
    },
    {
      name: 'Vision',
      icon: Eye,
      status: 'active',
      description: 'Camera and image processing'
    },
    {
      name: 'Touch',
      icon: Hand,
      status: 'active',
      description: 'Touch and gesture controls'
    },
    {
      name: 'Audio',
      icon: Volume2,
      status: 'active',
      description: 'Sound processing and feedback'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-warning animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    console.log('Voice command toggled:', !isListening);
  };

  const handleCameraAccess = () => {
    console.log('Camera access requested');
  };

  const handleGestureDemo = () => {
    console.log('Gesture demo started');
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
            <Rocket className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Phase 4: Multimodal UI</h2>
            <p className="text-muted-foreground">Advanced interaction through multiple modalities</p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Progress value={setupProgress} className="flex-1" />
            <Badge variant="outline">{setupProgress}%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Setup Progress</p>
        </div>
      </div>

      {/* Setup Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Multimodal Interface Setup
          </CardTitle>
          <CardDescription>
            Configure advanced interaction systems and input modalities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <div>
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-1">
                  {step.tech}
                </Badge>
                <p className="text-xs text-muted-foreground capitalize">{step.status}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Modality Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Active Modalities
          </CardTitle>
          <CardDescription>
            Real-time status of different interaction modalities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {modalityStatuses.map((modality, index) => {
              const Icon = modality.icon;
              return (
                 <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                   modality.status === 'active' 
                     ? 'border-success/20 bg-success/10' 
                     : 'border-muted bg-muted/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                     <Icon className={`h-5 w-5 ${
                       modality.status === 'active' ? 'text-success' : 'text-muted-foreground'
                     }`} />
                    <h4 className="font-medium">{modality.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{modality.description}</p>
                  <Badge variant={modality.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {modality.status.toUpperCase()}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Demo Interface */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Voice Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Control
            </CardTitle>
            <CardDescription>
              Speech recognition and voice commands
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
               <Mic className={`h-12 w-12 mx-auto mb-4 ${
                 isListening ? 'text-destructive animate-pulse' : 'text-muted-foreground'
              }`} />
              <p className="text-sm text-muted-foreground mb-4">
                {isListening ? 'Listening for voice commands...' : 'Click to start voice interaction'}
              </p>
              <Button 
                onClick={handleVoiceCommand}
                variant={isListening ? 'destructive' : 'default'}
                className="mb-2"
              >
                {isListening ? 'Stop Listening' : 'Start Voice Control'}
              </Button>
              {isListening && (
                <div className="mt-4">
                  <Input 
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    placeholder="Voice input will appear here..."
                    className="text-center"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visual Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Visual Input
            </CardTitle>
            <CardDescription>
              Camera integration and image analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Enable camera for visual interaction and object recognition
              </p>
              <Button onClick={handleCameraAccess} variant="outline">
                Enable Camera
              </Button>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Visual Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Object detection and recognition</li>
                <li>• Facial expression analysis</li>
                <li>• Scene understanding</li>
                <li>• Gesture tracking</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Gesture Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Move className="h-5 w-5" />
              Gesture Control
            </CardTitle>
            <CardDescription>
              Hand tracking and gesture recognition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Hand className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Use hand gestures to control the interface
              </p>
              <Button onClick={handleGestureDemo} variant="outline">
                Demo Gestures
              </Button>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <h4 className="font-medium mb-2">Supported Gestures</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Swipe left/right</li>
                <li>• Pinch to zoom</li>
                <li>• Point to select</li>
                <li>• Thumbs up/down</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Multimodal Technology Stack</CardTitle>
          <CardDescription>
            Advanced technologies powering the multimodal interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Input Processing</h4>
              <div className="grid gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-100">Speech Recognition</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Web Speech API, Whisper integration</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900 dark:text-green-100">Computer Vision</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">MediaPipe, OpenCV.js integration</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Output Generation</h4>
              <div className="grid gap-3">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-900 dark:text-purple-100">Text-to-Speech</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">ElevenLabs, Web Speech Synthesis</p>
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-pink-600" />
                    <span className="font-medium text-pink-900 dark:text-pink-100">Adaptive UI</span>
                  </div>
                  <p className="text-sm text-pink-700 dark:text-pink-300 mt-1">Dynamic React components, context-aware layouts</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase4;