import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User, Terminal, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'jarvis' | 'system';
  content: string;
  timestamp: Date;
  command?: string;
}

interface JarvisChatboxProps {
  onCommand: (command: string, target: string) => void;
  isProcessing: boolean;
}

const JarvisChatbox = ({ onCommand, isProcessing }: JarvisChatboxProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'jarvis',
      content: 'JARVIS cybersecurity assistant online. How may I assist with your security analysis today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const parseCommand = (input: string): { command: string; target: string; isValid: boolean } => {
    const cleanInput = input.toLowerCase().trim();
    
    // Command patterns
    const patterns = [
      { regex: /^\/scan\s+(.+)$/, command: 'domain scan' },
      { regex: /^\/ssl\s+(.+)$/, command: 'ssl check' },
      { regex: /^\/owasp\s+(.+)$/, command: 'owasp assessment' },
      { regex: /^\/headers\s+(.+)$/, command: 'security headers' },
      { regex: /^\/recon\s+(.+)$/, command: 'reconnaissance' },
      { regex: /scan\s+domain\s+(.+)/, command: 'domain scan' },
      { regex: /check\s+ssl\s+for\s+(.+)/, command: 'ssl check' },
      { regex: /run\s+owasp\s+assessment\s+on\s+(.+)/, command: 'owasp assessment' },
      { regex: /analyze\s+security\s+headers\s+for\s+(.+)/, command: 'security headers' },
      { regex: /perform\s+reconnaissance\s+on\s+(.+)/, command: 'reconnaissance' }
    ];

    for (const pattern of patterns) {
      const match = cleanInput.match(pattern.regex);
      if (match) {
        const target = match[1].trim();
        // Basic domain validation
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        const urlRegex = /^https?:\/\/[^\s]+$/;
        
        if (domainRegex.test(target) || urlRegex.test(target)) {
          return { command: pattern.command, target, isValid: true };
        }
      }
    }

    return { command: '', target: '', isValid: false };
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Parse command
    const { command, target, isValid } = parseCommand(input);

    if (isValid) {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: `🔍 Executing: ${command} on ${target}`,
        timestamp: new Date(),
        command: `${command} ${target}`
      };

      const jarvisResponse: ChatMessage = {
        id: (Date.now() + 2).toString(),
        type: 'jarvis',
        content: `Initiating ${command} for ${target}. Please wait while I perform the security assessment...`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, systemMessage, jarvisResponse]);
      onCommand(command, target);
    } else {
      // Check if it's a help request or general query
      const helpKeywords = ['help', 'commands', 'what can you do', 'how to'];
      const isHelpRequest = helpKeywords.some(keyword => input.toLowerCase().includes(keyword));

      let response = '';
      if (isHelpRequest) {
        response = `I can help with cybersecurity scanning and analysis. Available commands:

**Slash Commands:**
• /scan domain.com - Full vulnerability scan
• /ssl domain.com - SSL/TLS analysis
• /owasp domain.com - OWASP Top 10 assessment
• /headers domain.com - Security headers check
• /recon domain.com - Reconnaissance scan

**Natural Language:**
• "Scan domain example.com"
• "Check SSL for domain.com"
• "Run OWASP assessment on target.com"
• "Analyze security headers for site.com"
• "Perform reconnaissance on domain.com"

Simply type a command or ask me to scan a domain!`;
      } else {
        response = `I didn't recognize that as a security command. Try:
• /scan domain.com
• /ssl domain.com
• Or ask for "help" to see all available commands.`;
      }

      const jarvisResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'jarvis',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, jarvisResponse]);
    }

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const addScanResult = (success: boolean, details: string) => {
    const resultMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'jarvis',
      content: success 
        ? `✅ Scan completed successfully! ${details}`
        : `❌ Scan failed: ${details}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, resultMessage]);
  };

  // Expose addScanResult through ref or callback
  useEffect(() => {
    (window as any).jarvisChatAddResult = addScanResult;
    return () => {
      delete (window as any).jarvisChatAddResult;
    };
  }, []);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          JARVIS Command Interface
          {isProcessing && (
            <Badge variant="outline" className="animate-pulse">
              Processing...
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Natural language and command-line interface for cybersecurity operations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type !== 'user' && (
                  <div className="flex-shrink-0">
                    {message.type === 'jarvis' ? (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <Terminal className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : message.type === 'system'
                        ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-900 dark:text-orange-100 border border-orange-200 dark:border-orange-800'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.command && (
                      <Badge variant="outline" className="mt-2 text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        {message.command}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a command... (e.g., /scan domain.com or 'scan domain example.com')"
              disabled={isProcessing}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isProcessing}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {['/scan ', '/ssl ', '/owasp ', '/headers ', '/recon '].map((cmd) => (
              <Button
                key={cmd}
                variant="outline"
                size="sm"
                onClick={() => setInput(cmd)}
                className="text-xs"
                disabled={isProcessing}
              >
                {cmd.trim()}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JarvisChatbox;