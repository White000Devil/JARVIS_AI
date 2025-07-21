import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Settings, Rocket, Cloud, Shield, Zap, Globe, Server, Database, Code, Users, BarChart3, Cog } from 'lucide-react';

interface DeploymentStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  tech: string;
}

interface IntegrationStatus {
  name: string;
  icon: any;
  status: 'active' | 'inactive';
  description: string;
}

const Phase5 = () => {
  const [deploymentProgress, setDeploymentProgress] = useState(100);
  const [systemLoad, setSystemLoad] = useState(15);
  const [uptime, setUptime] = useState('99.9%');

  const deploymentSteps: DeploymentStep[] = [
    {
      id: 'infrastructure',
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud deployment and load balancing',
      status: 'completed',
      tech: 'AWS/Azure + Kubernetes'
    },
    {
      id: 'api-gateway',
      title: 'API Gateway & Security',
      description: 'API management, authentication, and security layers',
      status: 'completed',
      tech: 'Kong + OAuth 2.0'
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Analytics',
      description: 'Real-time monitoring and performance analytics',
      status: 'completed',
      tech: 'Prometheus + Grafana'
    },
    {
      id: 'ci-cd',
      title: 'CI/CD Pipeline',
      description: 'Automated testing, building, and deployment',
      status: 'completed',
      tech: 'GitHub Actions + Docker'
    },
    {
      id: 'scaling',
      title: 'Auto-Scaling & Optimization',
      description: 'Dynamic scaling based on demand and performance',
      status: 'completed',
      tech: 'HPA + Custom Metrics'
    }
  ];

  const integrationStatuses: IntegrationStatus[] = [
    {
      name: 'Database',
      icon: Database,
      status: 'active',
      description: 'Multi-region database cluster'
    },
    {
      name: 'APIs',
      icon: Code,
      status: 'active',
      description: 'RESTful and GraphQL endpoints'
    },
    {
      name: 'CDN',
      icon: Globe,
      status: 'active',
      description: 'Global content delivery network'
    },
    {
      name: 'Security',
      icon: Shield,
      status: 'active',
      description: 'End-to-end encryption and auth'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleDeployment = () => {
    console.log('Deployment initiated');
  };

  const handleScaling = () => {
    console.log('Auto-scaling configured');
  };

  const handleMonitoring = () => {
    console.log('Monitoring dashboard opened');
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
            <Rocket className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Phase 5: Production Deployment</h2>
            <p className="text-muted-foreground">Enterprise-grade deployment and scaling</p>
          </div>
        </div>
        
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Progress value={deploymentProgress} className="flex-1" />
            <Badge variant="outline">{deploymentProgress}%</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Deployment Progress</p>
        </div>
      </div>

      {/* System Status Dashboard */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{uptime}</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">System Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{systemLoad}%</div>
              <p className="text-sm text-muted-foreground">CPU Usage</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2.4K</div>
              <p className="text-sm text-muted-foreground">Online Now</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Deployment Configuration
          </CardTitle>
          <CardDescription>
            Production-ready infrastructure and deployment pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {deploymentSteps.map((step) => (
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

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5" />
            Active Integrations
          </CardTitle>
          <CardDescription>
            Real-time status of critical system components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrationStatuses.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                  integration.status === 'active' 
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
                    : 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-5 w-5 ${
                      integration.status === 'active' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <h4 className="font-medium">{integration.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{integration.description}</p>
                  <Badge variant={integration.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {integration.status.toUpperCase()}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Production Controls */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Deployment Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Deployment
            </CardTitle>
            <CardDescription>
              Manage production deployments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Cloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Deploy to production environment with zero downtime
              </p>
              <Button onClick={handleDeployment} className="mb-2">
                Deploy to Production
              </Button>
              <div className="bg-muted/50 p-3 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Deployment Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Blue-green deployment</li>
                  <li>• Automated rollback</li>
                  <li>• Health checks</li>
                  <li>• Zero downtime</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scaling Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Auto-Scaling
            </CardTitle>
            <CardDescription>
              Dynamic resource allocation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Automatically scale resources based on demand
              </p>
              <Button onClick={handleScaling} variant="outline">
                Configure Scaling
              </Button>
              <div className="bg-muted/50 p-3 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Scaling Metrics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• CPU utilization</li>
                  <li>• Memory usage</li>
                  <li>• Request rate</li>
                  <li>• Response time</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Monitoring
            </CardTitle>
            <CardDescription>
              Real-time system monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 border-2 border-dashed border-muted-foreground/25 rounded-lg">
              <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Monitor system performance and user analytics
              </p>
              <Button onClick={handleMonitoring} variant="outline">
                View Dashboard
              </Button>
              <div className="bg-muted/50 p-3 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Monitoring Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Performance metrics</li>
                  <li>• Error tracking</li>
                  <li>• User analytics</li>
                  <li>• Alert system</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production Architecture */}
      <Card>
        <CardHeader>
          <CardTitle>Production Architecture</CardTitle>
          <CardDescription>
            Enterprise-grade infrastructure and technology stack
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Infrastructure</h4>
              <div className="grid gap-3">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-100">Microservices</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Containerized services with Kubernetes orchestration</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-900 dark:text-green-100">Global CDN</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">Multi-region content delivery and edge computing</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Operations</h4>
              <div className="grid gap-3">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="font-medium text-purple-900 dark:text-purple-100">Security</span>
                  </div>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">WAF, DDoS protection, and security scanning</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span className="font-medium text-orange-900 dark:text-orange-100">Support</span>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">24/7 monitoring and incident response</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                🎉 JARVIS AI System Complete!
              </h3>
              <p className="text-green-700 dark:text-green-300 mt-2">
                Your advanced AI assistant is now fully deployed and ready for production use.
                All phases completed successfully with enterprise-grade infrastructure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase5;