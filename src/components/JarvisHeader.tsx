import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Eye, MessageSquare, Shield, Settings, Rocket, Bot } from 'lucide-react';

interface JarvisHeaderProps {
  currentPhase: number;
  onPhaseChange?: (phase: number) => void;
}

const phases = [
  { id: 0, name: 'Preparation', icon: Settings },
  { id: 1, name: 'Core NLP', icon: MessageSquare },
  { id: 2, name: 'Video Learning', icon: Eye },
  { id: 3, name: 'Self-Learning', icon: Brain },
  { id: 4, name: 'Multimodal UI', icon: Rocket },
  { id: 5, name: 'Production Deploy', icon: Shield },
  { id: 6, name: 'JARVIS Active', icon: Bot }
];

const JarvisHeader = ({ currentPhase, onPhaseChange }: JarvisHeaderProps) => {
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
                onClick={() => onPhaseChange?.(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer hover:scale-105 ${
                  isActive 
                    ? 'bg-primary/10 border-2 border-primary/30' 
                    : isCompleted 
                    ? 'bg-secondary/50 border border-secondary hover:bg-secondary/70' 
                    : 'bg-muted/50 hover:bg-muted/70'
                }`}
              >
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                   isActive ? 'bg-primary' : isCompleted ? 'bg-secondary' : 'bg-muted'
                 }`}>
                   <Icon className={`h-3 w-3 ${
                     isActive || isCompleted ? 'text-primary-foreground' : 'text-muted-foreground'
                   }`} />
                </div>
                 <span className={`text-sm font-medium ${
                   isActive ? 'text-primary' : isCompleted ? 'text-secondary-foreground' : 'text-muted-foreground'
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