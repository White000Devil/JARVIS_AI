import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Eye, MessageSquare, Shield, Settings, Rocket } from 'lucide-react';

interface JarvisHeaderProps {
  currentPhase: number;
}

const phases = [
  { id: 0, name: 'Preparation', icon: Settings, color: 'bg-blue-500' },
  { id: 1, name: 'Core NLP', icon: MessageSquare, color: 'bg-green-500' },
  { id: 2, name: 'Video Learning', icon: Eye, color: 'bg-purple-500' },
  { id: 3, name: 'Self-Learning', icon: Brain, color: 'bg-orange-500' },
  { id: 4, name: 'Multimodal UI', icon: Rocket, color: 'bg-pink-500' },
  { id: 5, name: 'Security & Deploy', icon: Shield, color: 'bg-red-500' }
];

const JarvisHeader = ({ currentPhase }: JarvisHeaderProps) => {
  const progress = ((currentPhase + 1) / phases.length) * 100;

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                JARVIS AI Assistant
              </h1>
              <p className="text-sm text-muted-foreground">Development Phase {currentPhase}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <Progress value={progress} className="w-32" />
              <Badge variant="secondary">{Math.round(progress)}%</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Overall Progress</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const isActive = index === currentPhase;
            const isCompleted = index < currentPhase;
            
            return (
              <div
                key={phase.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-primary/10 border-2 border-primary/30' 
                    : isCompleted 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-muted/50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-primary' : isCompleted ? 'bg-green-500' : 'bg-muted'
                }`}>
                  <Icon className={`h-3 w-3 ${
                    isActive || isCompleted ? 'text-white' : 'text-muted-foreground'
                  }`} />
                </div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-primary' : isCompleted ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'
                }`}>
                  {phase.name}
                </span>
                {index < phases.length - 1 && (
                  <div className="w-8 h-px bg-border ml-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default JarvisHeader;