import { useState } from 'react';
import JarvisHeader from '@/components/JarvisHeader';
import Phase0 from '@/components/Phase0';

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <JarvisHeader currentPhase={currentPhase} />
      <div className="container mx-auto px-4 py-8">
        <Phase0 />
      </div>
    </div>
  );
};

export default Index;
