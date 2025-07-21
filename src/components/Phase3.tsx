import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Zap, Database, TrendingUp, CheckCircle, Clock, Settings, BookOpen, Target } from 'lucide-react';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  tech: string;
}

interface LearningMetric {
  label: string;
  value: number;
  change: number;
  unit: string;
}

const Phase3 = () => {
  const [setupProgress, setSetupProgress] = useState(100);
  const [trainingInput, setTrainingInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const setupSteps: SetupStep[] = [
    {
      id: 'ml-framework',
      title: 'Machine Learning Framework',
      description: 'Initialize adaptive learning algorithms',
      status: 'completed',
      tech: 'TensorFlow.js + Custom Models'
    },
    {
      id: 'knowledge-base',
      title: 'Dynamic Knowledge Base',
      description: 'Set up self-updating knowledge management',
      status: 'completed',
      tech: 'Vector Database + RAG'
    },
    {
      id: 'feedback-loop',
      title: 'Feedback Learning Loop',
      description: 'Implement continuous improvement system',
      status: 'completed',
      tech: 'Reinforcement Learning'
    },
    {
      id: 'performance-monitoring',
      title: 'Performance Analytics',
      description: 'Real-time learning effectiveness tracking',
      status: 'completed',
      tech: 'Custom Analytics Engine'
    }
  ];

  const learningMetrics: LearningMetric[] = [
    { label: 'Knowledge Retention', value: 94, change: +5, unit: '%' },
    { label: 'Response Accuracy', value: 89, change: +12, unit: '%' },
    { label: 'Learning Speed', value: 156, change: +23, unit: 'concepts/day' },
    { label: 'Adaptation Rate', value: 87, change: +8, unit: '%' }
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

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Training input:', trainingInput);
    setTrainingInput('');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback input:', feedbackInput);
    setFeedbackInput('');
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
            <Brain className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Phase 3: Self-Learning</h2>
            <p className="text-muted-foreground">Adaptive intelligence and continuous improvement</p>
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
            Self-Learning System Setup
          </CardTitle>
          <CardDescription>
            Configure adaptive learning and continuous improvement capabilities
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

      {/* Learning Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Learning Performance Metrics
          </CardTitle>
          <CardDescription>
            Real-time monitoring of AI learning effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {learningMetrics.map((metric, index) => (
              <div key={index} className="bg-gradient-to-br from-muted/50 to-muted/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-muted-foreground">{metric.label}</h4>
                   <div className={`flex items-center gap-1 text-xs ${
                     metric.change > 0 ? 'text-success' : 'text-destructive'
                   }`}>
                    <TrendingUp className="h-3 w-3" />
                    {metric.change > 0 ? '+' : ''}{metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {metric.value}{metric.unit}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Learning Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Training Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Knowledge Training
            </CardTitle>
            <CardDescription>
              Provide new information for the AI to learn and adapt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrainingSubmit} className="space-y-4">
              <Textarea
                value={trainingInput}
                onChange={(e) => setTrainingInput(e.target.value)}
                placeholder="Enter new knowledge, concepts, or information for the AI to learn..."
                className="min-h-[120px]"
              />
              <Button type="submit" className="w-full" disabled={!trainingInput.trim()}>
                <Brain className="h-4 w-4 mr-2" />
                Train AI System
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feedback System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Feedback Learning
            </CardTitle>
            <CardDescription>
              Provide feedback to improve AI responses and behavior
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <Textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Provide feedback on AI responses, corrections, or improvement suggestions..."
                className="min-h-[120px]"
              />
              <Button type="submit" variant="outline" className="w-full" disabled={!feedbackInput.trim()}>
                <Zap className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Learning Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>Self-Learning Capabilities</CardTitle>
          <CardDescription>
            Advanced AI learning and adaptation features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Knowledge Synthesis</h4>
              </div>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <li>• Automatic concept mapping</li>
                <li>• Cross-domain knowledge linking</li>
                <li>• Dynamic fact validation</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-900 dark:text-green-100">Adaptive Learning</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                <li>• Personalized response patterns</li>
                <li>• Context-aware adaptation</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-5 w-5 text-orange-600" />
                <h4 className="font-medium text-orange-900 dark:text-orange-100">Continuous Improvement</h4>
              </div>
              <ul className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                <li>• Real-time model updates</li>
                <li>• Error pattern recognition</li>
                <li>• Self-correcting mechanisms</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase3;