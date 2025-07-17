import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, Play, MessageSquare, Database, Brain, Cpu, Zap } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Phase1 = () => {
  const [setupProgress, setSetupProgress] = useState(100);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'JARVIS NLP Engine initialized. How can I assist you with cybersecurity?',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const setupSteps = [
    {
      id: 'ollama',
      title: 'Ollama & Mistral-7B Setup',
      description: 'Configure local LLM with Mistral model',
      status: 'completed' as const,
      tech: 'Ollama + Mistral-7B'
    },
    {
      id: 'chromadb',
      title: 'ChromaDB Memory',
      description: 'Initialize vector database for conversation memory',
      status: 'completed' as const,
      tech: 'ChromaDB + HuggingFace Embeddings'
    },
    {
      id: 'langchain',
      title: 'LangChain Integration',
      description: 'Connect LLM with memory management',
      status: 'completed' as const,
      tech: 'LangChain + Custom Memory'
    },
    {
      id: 'nlp-engine',
      title: 'NLP Engine Testing',
      description: 'Test chat functionality and response quality',
      status: 'completed' as const,
      tech: 'Custom NLP Pipeline'
    }
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);
    setChatInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you're interested in cybersecurity. Let me analyze that query using my knowledge base...",
        "Based on my training data from bug bounty reports, here's what I found...",
        "I'm processing your request through my ChromaDB memory system. Here are the relevant insights...",
        "Let me cross-reference this with my CVE database and provide a comprehensive answer..."
      ];
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
      
      // Update progress
      setSetupProgress(prev => Math.min(prev + 25, 100));
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Check className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Play className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in-progress': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-8">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Phase 1: Core NLP & Memory
            </h1>
            <p className="text-muted-foreground">Building the conversational AI foundation</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Progress value={setupProgress} className="w-64" />
          <Badge variant="secondary">{setupProgress}% Complete</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Setup Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              System Setup Progress
            </CardTitle>
            <CardDescription>
              Core NLP components and memory systems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {setupSteps.map((step) => (
              <div key={step.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  {getStatusIcon(step.status)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{step.title}</h4>
                      <Badge variant="outline" className={getStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {step.tech}
                    </Badge>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Live Chat Test */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              NLP Engine Test
            </CardTitle>
            <CardDescription>
              Test the conversational AI capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-64 w-full border rounded-lg p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <span className="text-sm text-muted-foreground ml-2">JARVIS is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                placeholder="Ask JARVIS about cybersecurity..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isProcessing}
              />
              <Button onClick={handleSendMessage} disabled={isProcessing || !chatInput.trim()}>
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Memory System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Memory System Status
          </CardTitle>
          <CardDescription>
            ChromaDB vector database and conversation memory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{chatMessages.length}</div>
              <div className="text-sm text-muted-foreground">Messages Stored</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">1,247</div>
              <div className="text-sm text-muted-foreground">Vector Embeddings</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">98.5%</div>
              <div className="text-sm text-muted-foreground">Memory Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase1;