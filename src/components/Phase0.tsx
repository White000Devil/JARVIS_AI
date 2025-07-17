import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Terminal, Download, Database, Globe, Folder, GitBranch } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  description: string;
  commands?: string[];
  completed: boolean;
  icon: any;
}

const Phase0 = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 'repo',
      title: 'Setup Repository & Environment',
      description: 'Initialize project structure and Python virtual environment',
      commands: [
        'mkdir Jarvis_AI && cd Jarvis_AI',
        'git init',
        'python -m venv venv',
        'source venv/bin/activate'
      ],
      completed: false,
      icon: GitBranch
    },
    {
      id: 'deps',
      title: 'Install Core Dependencies',
      description: 'Install essential Python packages for AI and ML',
      commands: [
        'pip install transformers torch',
        'pip install langchain chromadb',
        'pip install opencv-python pytesseract',
        'pip install gradio streamlit fastapi'
      ],
      completed: false,
      icon: Download
    },
    {
      id: 'models',
      title: 'Download AI Models',
      description: 'Pull pre-trained models for NLP, Vision, and Speech',
      commands: [
        'ollama pull mistral',
        'git clone https://huggingface.co/Salesforce/blip2-opt-2.7b',
        'pip install openai-whisper'
      ],
      completed: false,
      icon: Database
    },
    {
      id: 'data',
      title: 'Scrape Initial Datasets',
      description: 'Gather bug bounty reports and CVE database',
      commands: [
        'scrapy startproject bug_scraper',
        'wget https://nvd.nist.gov/feeds/json/cve/1.1/nvdcve-1.1-recent.json.gz',
        'mkdir -p data/training_data'
      ],
      completed: false,
      icon: Globe
    },
    {
      id: 'structure',
      title: 'Create Project Structure',
      description: 'Set up the complete folder hierarchy',
      commands: [
        'mkdir -p core interface/voice interface/web_ui',
        'mkdir -p bug_bounty data/knowledge_graph',
        'mkdir -p utils tests'
      ],
      completed: false,
      icon: Folder
    },
    {
      id: 'config',
      title: 'Setup Configuration',
      description: 'Create config files and basic testing',
      commands: [
        'touch config.yaml requirements.txt',
        'echo "# JARVIS AI Assistant" > README.md',
        'python -c "import torch; print(f\'PyTorch: {torch.__version__}\')"'
      ],
      completed: false,
      icon: Terminal
    }
  ]);

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  const toggleStep = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: !step.completed } : step
    ));
  };

  const completeAll = () => {
    setSteps(prev => prev.map(step => ({ ...step, completed: true })));
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Phase 0: Preparation
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Setting up the development environment, gathering datasets, and preparing the foundation for JARVIS AI
        </p>
        <div className="flex items-center justify-center gap-4">
          <Progress value={progress} className="w-64" />
          <Badge variant={progress === 100 ? "default" : "secondary"}>
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card 
              key={step.id} 
              className={`transition-all duration-300 cursor-pointer hover:shadow-lg ${
                step.completed ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'
              }`}
              onClick={() => toggleStep(step.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <Badge variant="outline">{index + 1}</Badge>
                  </div>
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              
              {step.commands && (
                <CardContent className="pt-0">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Commands:</p>
                    <div className="space-y-1">
                      {step.commands.map((cmd, idx) => (
                        <code key={idx} className="block text-xs bg-background px-2 py-1 rounded text-foreground">
                          {cmd}
                        </code>
                      ))}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <div className="text-center space-y-4">
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={completeAll}
            disabled={progress === 100}
            size="lg"
          >
            Complete All Steps
          </Button>
          <Button 
            variant="outline"
            disabled={progress < 100}
            size="lg"
          >
            Proceed to Phase 1
          </Button>
        </div>
        
        {progress === 100 && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <p className="text-green-800 dark:text-green-200 font-medium">
              🎉 Phase 0 Complete! Environment setup successful. Ready to proceed to Core NLP & Memory implementation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phase0;