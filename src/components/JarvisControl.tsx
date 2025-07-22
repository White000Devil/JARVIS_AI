import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, Shield, Activity } from 'lucide-react';
import JarvisVoiceInterface from './JarvisVoiceInterface';
import JarvisChatbox from './JarvisChatbox';
import SecurityScanner from './SecurityScanner';
import ScanResults from './ScanResults';
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

const JarvisControl = () => {
  const { toast } = useToast();
  const [currentScan, setCurrentScan] = useState<{ command: string; target: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<SecurityScanResult[]>([]);
  const [activeTab, setActiveTab] = useState('voice');

  const handleCommand = (command: string, target?: string) => {
    if (!target) {
      // For voice interface, try to extract target from command
      const words = command.toLowerCase().split(' ');
      const domainIndex = words.findIndex(word => 
        word.includes('.') && (word.includes('.com') || word.includes('.org') || word.includes('.net'))
      );
      
      if (domainIndex !== -1) {
        target = words[domainIndex];
        // Determine command type from the voice input
        if (command.toLowerCase().includes('ssl')) {
          command = 'ssl check';
        } else if (command.toLowerCase().includes('owasp')) {
          command = 'owasp assessment';
        } else if (command.toLowerCase().includes('headers')) {
          command = 'security headers';
        } else if (command.toLowerCase().includes('recon')) {
          command = 'reconnaissance';
        } else {
          command = 'domain scan';
        }
      } else {
        toast({
          title: "Invalid Command",
          description: "Please specify a valid domain or URL to scan.",
          variant: "destructive",
        });
        return;
      }
    }

    if (!target) {
      toast({
        title: "Target Required",
        description: "Please specify a domain or URL to scan.",
        variant: "destructive",
      });
      return;
    }

    setCurrentScan({ command, target });
    setIsScanning(true);
    
    toast({
      title: "Scan Initiated",
      description: `Starting ${command} for ${target}`,
    });

    // Switch to scanner tab to show progress
    setActiveTab('scanner');
  };

  const handleScanComplete = (result: SecurityScanResult) => {
    setScanResults(prev => [result, ...prev]);
    setIsScanning(false);
    setCurrentScan(null);

    // Update chat if available
    if ((window as any).jarvisChatAddResult) {
      const success = result.status === 'completed';
      const details = success 
        ? `Security score: ${result.score}/100. Found ${result.vulnerabilities.critical + result.vulnerabilities.high + result.vulnerabilities.medium + result.vulnerabilities.low} issues.`
        : 'Scan encountered an error.';
      
      (window as any).jarvisChatAddResult(success, details);
    }

    // Switch to results tab
    setActiveTab('results');
  };

  const getSystemStatus = () => {
    const totalVulns = scanResults.reduce((total, result) => 
      total + result.vulnerabilities.critical + result.vulnerabilities.high + 
      result.vulnerabilities.medium + result.vulnerabilities.low, 0
    );

    const avgScore = scanResults.length > 0 
      ? scanResults.reduce((sum, result) => sum + (result.score || 0), 0) / scanResults.length
      : 0;

    return {
      scansCompleted: scanResults.length,
      vulnerabilitiesFound: totalVulns,
      averageScore: Math.round(avgScore),
      isOperational: true
    };
  };

  const status = getSystemStatus();

  return (
    <div className="w-full space-y-6">
      {/* JARVIS Status Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">JARVIS Cybersecurity Assistant</h1>
              <p className="text-muted-foreground">Advanced AI-powered security analysis and vulnerability assessment</p>
            </div>
            <Badge variant={status.isOperational ? "default" : "destructive"} className="ml-auto">
              {status.isOperational ? "Operational" : "Offline"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Scans Completed</h3>
              </div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{status.scansCompleted}</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <h3 className="font-medium text-orange-900 dark:text-orange-100">Vulnerabilities</h3>
              </div>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">{status.vulnerabilitiesFound}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-green-600" />
                <h3 className="font-medium text-green-900 dark:text-green-100">Average Score</h3>
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{status.averageScore}/100</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="h-4 w-4 text-purple-600" />
                <h3 className="font-medium text-purple-900 dark:text-purple-100">Status</h3>
              </div>
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {isScanning ? 'Scanning...' : 'Ready'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Interface Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="voice" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Voice Interface
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Command Chat
          </TabsTrigger>
          <TabsTrigger value="scanner" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security Scanner
            {isScanning && <Badge variant="secondary" className="ml-1">Running</Badge>}
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Scan Results
            {scanResults.length > 0 && (
              <Badge variant="outline" className="ml-1">{scanResults.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voice" className="space-y-6">
          <JarvisVoiceInterface 
            onCommand={handleCommand}
            isProcessing={isScanning}
          />
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <JarvisChatbox
            onCommand={handleCommand}
            isProcessing={isScanning}
          />
        </TabsContent>

        <TabsContent value="scanner" className="space-y-6">
          {currentScan ? (
            <SecurityScanner
              targetDomain={currentScan.target}
              scanCommand={currentScan.command}
              onScanComplete={handleScanComplete}
            />
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center space-y-4">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium">No Active Scan</h3>
                    <p className="text-muted-foreground">
                      Use the voice interface or chat to initiate a security scan
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <ScanResults results={scanResults} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JarvisControl;