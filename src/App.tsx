/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import StartScreen from './components/StartScreen';
import InteractionScreen from './components/InteractionScreen';
import PolishingScreen from './components/PolishingScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultScreen from './components/ResultScreen';
import LsiButterfly from './components/LsiButterfly';
import { AnalysisResult, InteractionData } from './types';
import { calculateParams, matchJewel } from './lib/analyzer';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'interact' | 'polish' | 'processing' | 'result'>('start');
  const [interactData, setInteractData] = useState<Omit<InteractionData, 'polishTimeMs' | 'polishCount'> | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleStart = () => setScreen('interact');
  
  const handleInteractionComplete = (data: Omit<InteractionData, 'polishTimeMs' | 'polishCount'>) => {
    setInteractData(data);
    setScreen('polish');
  };

  const handlePolishComplete = (data: InteractionData) => {
    const params = calculateParams(data);
    const analysisResult = matchJewel(params, data.finalColor);
    setResult(analysisResult);
    setScreen('processing');
  };

  const handleProcessingFinish = () => setScreen('result');
  
  const handleRetry = () => {
    setInteractData(null);
    setResult(null);
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-700 overflow-x-hidden">
      {screen !== 'result' && <LsiButterfly />}
      <AnimatePresence mode="wait">
        {screen === 'start' && <StartScreen key="start" onStart={handleStart} />}
        {screen === 'interact' && <InteractionScreen key="interact" onComplete={handleInteractionComplete} />}
        {screen === 'polish' && interactData && <PolishingScreen key="polish" initialData={interactData} onComplete={handlePolishComplete} />}
        {screen === 'processing' && <ProcessingScreen key="processing" onFinish={handleProcessingFinish} />}
        {screen === 'result' && result && <ResultScreen key="result" result={result} onRetry={handleRetry} />}
      </AnimatePresence>
    </div>
  );
}
