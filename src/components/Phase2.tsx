import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Eye, Camera, Video, FileText, CheckCircle, Clock, Settings } from 'lucide-react';

interface SetupStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  tech: string;
}

const Phase2 = () => {
  const [setupProgress, setSetupProgress] = useState(100);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const setupSteps: SetupStep[] = [
    {
      id: 'computer-vision',
      title: 'Computer Vision Engine',
      description: 'Initialize video processing and object detection',
      status: 'completed',
      tech: 'OpenCV + TensorFlow.js'
    },
    {
      id: 'video-analysis',
      title: 'Video Analysis Pipeline',
      description: 'Set up frame extraction and content analysis',
      status: 'completed',
      tech: 'Custom ML Pipeline'
    },
    {
      id: 'learning-extraction',
      title: 'Learning Content Extraction',
      description: 'Extract and categorize educational content',
      status: 'completed',
      tech: 'NLP + Vision Transformers'
    }
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

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
            <Eye className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Phase 2: Video Learning</h2>
            <p className="text-muted-foreground">Visual content processing and learning extraction</p>
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
            System Setup
          </CardTitle>
          <CardDescription>
            Configure video processing and learning extraction systems
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {setupSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
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

      {/* Video Learning Interface */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Video Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Input
            </CardTitle>
            <CardDescription>
              Upload educational videos for content analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Upload Learning Video</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to select video files
              </p>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload">
                <Button variant="outline" className="cursor-pointer">
                  Select Video
                </Button>
              </label>
            </div>
            
            {selectedVideo && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">{selectedVideo.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Size: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Learning Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Content Analysis
            </CardTitle>
            <CardDescription>
              AI-powered learning content extraction and categorization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-medium mb-2">Analysis Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                   <li className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                     Scene detection and segmentation
                  </li>
                   <li className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                     Text and speech recognition
                  </li>
                   <li className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                     Concept identification and tagging
                  </li>
                   <li className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-primary rounded-full"></div>
                     Learning objective extraction
                  </li>
                </ul>
              </div>
              
              <Button 
                className="w-full" 
                disabled={!selectedVideo}
                variant={selectedVideo ? "default" : "secondary"}
              >
                {selectedVideo ? "Analyze Video Content" : "Upload Video First"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Integration</CardTitle>
          <CardDescription>
            Advanced computer vision and machine learning technologies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Computer Vision</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">OpenCV, MediaPipe for video processing</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Machine Learning</h4>
              <p className="text-sm text-green-700 dark:text-green-300">TensorFlow.js, Vision Transformers</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Content Analysis</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">NLP integration with visual understanding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Phase2;