import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  Globe,
  Lock,
  Eye,
  Database
} from 'lucide-react';

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

interface ScanResultsProps {
  results: SecurityScanResult[];
}

const ScanResults = ({ results }: ScanResultsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-600 dark:text-orange-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'outline';
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreDescription = (score: number) => {
    if (score >= 80) return 'Excellent Security';
    if (score >= 60) return 'Good Security';
    if (score >= 40) return 'Fair Security';
    return 'Poor Security';
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (results.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-medium">No Scan Results Yet</h3>
              <p className="text-muted-foreground">
                Use the voice interface or chatbox to run security scans
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <Card key={index} className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{result.domain}</CardTitle>
                  <CardDescription className="capitalize">
                    {result.scanType} • {formatDate(result.timestamp)}
                  </CardDescription>
                </div>
              </div>
              
              <div className="text-right">
                <Badge 
                  variant={result.status === 'completed' ? 'default' : result.status === 'failed' ? 'destructive' : 'secondary'}
                >
                  {result.status}
                </Badge>
                {result.score !== undefined && (
                  <div className="mt-2">
                    <div className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getScoreDescription(result.score)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {result.score !== undefined && (
              <div className="space-y-2">
                <Progress value={result.score} className="h-2" />
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-red-600 dark:text-red-400 font-bold text-lg">
                      {result.vulnerabilities.critical}
                    </div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">
                      {result.vulnerabilities.high}
                    </div>
                    <div className="text-xs text-muted-foreground">High</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">
                      {result.vulnerabilities.medium}
                    </div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {result.vulnerabilities.low}
                    </div>
                    <div className="text-xs text-muted-foreground">Low</div>
                  </div>
                </div>
              </div>
            )}
          </CardHeader>

          {result.findings.length > 0 && (
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <h4 className="font-medium">Security Findings</h4>
                </div>
                
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {result.findings.map((finding, findingIndex) => (
                      <div key={findingIndex} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={getSeverityColor(finding.severity)}>
                              {getSeverityIcon(finding.severity)}
                            </div>
                            <h5 className="font-medium">{finding.type}</h5>
                          </div>
                          <Badge variant={getSeverityBadgeVariant(finding.severity) as any}>
                            {finding.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <h6 className="text-sm font-medium text-muted-foreground mb-1">Description:</h6>
                            <p className="text-sm">{finding.description}</p>
                          </div>
                          
                          <div>
                            <h6 className="text-sm font-medium text-muted-foreground mb-1">Recommendation:</h6>
                            <p className="text-sm text-green-700 dark:text-green-300">{finding.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ScanResults;