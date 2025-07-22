import { useState } from 'react';
import JarvisHeader from '@/components/JarvisHeader';
import Phase0 from '@/components/Phase0';
import Phase1 from '@/components/Phase1';
import Phase2 from '@/components/Phase2';
import Phase3 from '@/components/Phase3';
import Phase4 from '@/components/Phase4';
import Phase5 from '@/components/Phase5';
import JarvisControl from '@/components/JarvisControl';

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState(6); // Start with JARVIS Active

  const handlePhaseChange = (phaseId: number) => {
    setCurrentPhase(phaseId);
  };

  const renderCurrentPhase = () => {
    switch (currentPhase) {
      case 0:
        return <Phase0 />;
      case 1:
        return <Phase1 />;
      case 2:
        return <Phase2 />;
      case 3:
        return <Phase3 />;
      case 4:
        return <Phase4 />;
      case 5:
        return <Phase5 />;
      case 6:
        return <JarvisControl />;
      default:
        return <Phase0 />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <JarvisHeader 
        currentPhase={currentPhase} 
        onPhaseChange={handlePhaseChange}
      />
      <div className="container mx-auto px-4 py-8">
        {renderCurrentPhase()}
      </div>
    </div>
  );
};

export default Index;
