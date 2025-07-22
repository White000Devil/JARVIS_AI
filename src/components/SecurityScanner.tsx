import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SecurityScanResult {
  domain: string;
  scanType: string;
  status: 'running' | 'completed' | 'failed';
  score?: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  findings: Array<{
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    recommendation: string;
  }>;
  timestamp: string;
}

interface SecurityScannerProps {
  targetDomain: string;
  scanCommand: string;
  onScanComplete: (result: SecurityScanResult) => void;
}

const SecurityScanner = ({ targetDomain, scanCommand, onScanComplete }: SecurityScannerProps) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const simulateSecurityScan = async (): Promise<SecurityScanResult> => {
    const steps = [
      'Resolving domain...',
      'Checking SSL/TLS configuration...',
      'Analyzing security headers...',
      'Testing for common vulnerabilities...',
      'Running OWASP Top 10 checks...',
      'Scanning for exposed services...',
      'Checking for subdomain enumeration...',
      'Analyzing web application firewall...',
      'Testing authentication mechanisms...',
      'Finalizing security assessment...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 10);
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }

    // Simulate scan results
    const mockFindings = [
      {
        type: 'SSL/TLS Configuration',
        severity: 'medium' as const,
        description: 'TLS 1.0 and 1.1 are still enabled',
        recommendation: 'Disable TLS 1.0 and 1.1, use only TLS 1.2 and 1.3'
      },
      {
        type: 'Security Headers',
        severity: 'high' as const,
        description: 'Missing Content Security Policy (CSP) header',
        recommendation: 'Implement a strict Content Security Policy'
      },
      {
        type: 'Information Disclosure',
        severity: 'low' as const,
        description: 'Server version exposed in HTTP headers',
        recommendation: 'Configure server to hide version information'
      },
      {
        type: 'Directory Traversal',
        severity: 'critical' as const,
        description: 'Potential directory traversal vulnerability detected',
        recommendation: 'Implement proper input validation and access controls'
      }
    ];

    const vulnerabilities = {
      critical: mockFindings.filter(f => f.severity === 'critical').length,
      high: mockFindings.filter(f => f.severity === 'high').length,
      medium: mockFindings.filter(f => f.severity === 'medium').length,
      low: mockFindings.filter(f => f.severity === 'low').length,
    };

    const score = Math.max(0, 100 - (vulnerabilities.critical * 25 + vulnerabilities.high * 15 + vulnerabilities.medium * 10 + vulnerabilities.low * 5));

    return {
      domain: targetDomain,
      scanType: scanCommand,
      status: 'completed',
      score,
      vulnerabilities,
      findings: mockFindings,
      timestamp: new Date().toISOString()
    };
  };

  const runScan = async () => {
    setIsScanning(true);
    setProgress(0);
    setCurrentStep('Initializing scan...');

    try {
      const result = await simulateSecurityScan();
      
      toast({
        title: "Scan Completed",
        description: `Security assessment for ${targetDomain} completed with score: ${result.score}/100`,
        variant: result.score && result.score >= 70 ? "default" : "destructive",
      });

      onScanComplete(result);
    } catch (error) {
      console.error('Scan error:', error);
      toast({
        title: "Scan Failed",
        description: "Unable to complete security scan. Please try again.",
        variant: "destructive",
      });

      const failedResult: SecurityScanResult = {
        domain: targetDomain,
        scanType: scanCommand,
        status: 'failed',
        vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
        findings: [],
        timestamp: new Date().toISOString()
      };
      onScanComplete(failedResult);
    } finally {
      setIsScanning(false);
      setProgress(100);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <XCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Clock className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security Scanner
          <Badge variant="outline" className="ml-auto">
            <Globe className="h-3 w-3 mr-1" />
            {targetDomain}
          </Badge>
        </CardTitle>
        <CardDescription>
          Comprehensive security assessment: {scanCommand}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isScanning ? (
          <Button onClick={runScan} className="w-full">
            <Shield className="h-4 w-4 mr-2" />
            Start Security Scan
          </Button>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Scanning Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {currentStep}
              </p>
            </div>
          </div>
        )}

        {/* Scan Capabilities */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-2">OWASP Top 10</h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Injection attacks</li>
              <li>• Broken authentication</li>
              <li>• Sensitive data exposure</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm text-green-900 dark:text-green-100 mb-2">Infrastructure</h4>
            <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
              <li>• SSL/TLS configuration</li>
              <li>• Security headers</li>
              <li>• Port scanning</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm text-purple-900 dark:text-purple-100 mb-2">Web Application</h4>
            <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
              <li>• XSS vulnerabilities</li>
              <li>• CSRF protection</li>
              <li>• Input validation</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm text-orange-900 dark:text-orange-100 mb-2">Reconnaissance</h4>
            <ul className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
              <li>• Subdomain enumeration</li>
              <li>• Technology detection</li>
              <li>• Directory discovery</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScanner;