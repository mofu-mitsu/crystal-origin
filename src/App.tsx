/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';
import StartScreen from './components/StartScreen';
import InteractionScreen from './components/InteractionScreen';
import PolishingScreen from './components/PolishingScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ResultScreen from './components/ResultScreen';
import LsiButterfly from './components/LsiButterfly';
import { AnalysisResult, InteractionData } from './types';
import { calculateParams, matchJewel } from './lib/analyzer';
import { SoundManager } from './lib/sound';

export default function App() {
  const [screen, setScreen] = useState<'start' | 'interact' | 'polish' | 'processing' | 'result'>('start');
  const [interactData, setInteractData] = useState<Omit<InteractionData, 'polishTimeMs' | 'polishCount'> | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  // 初回ロードなどの効果音処理
  useEffect(() => {
    // 状態を同期
    SoundManager.setMuted(isMuted);
  }, []);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    SoundManager.setMuted(nextMuted);
    
    // ミュート解除の瞬間にきらりとした音階を鳴らす
    if (!nextMuted) {
      setTimeout(() => {
        SoundManager.playClick();
        SoundManager.startBGM();
      }, 50);
    } else {
      SoundManager.stopBGM();
    }
  };

  const handleStart = () => {
    SoundManager.playClick();
    SoundManager.startBGM(); // スタートのタイミングでBGM開始
    setScreen('interact');
  };
  
  const handleInteractionComplete = (data: Omit<InteractionData, 'polishTimeMs' | 'polishCount'>) => {
    SoundManager.playClick();
    setInteractData(data);
    setScreen('polish');
  };

  const handlePolishComplete = (data: InteractionData) => {
    // 磨き完了時にきらきらと輝くサウンド！
    SoundManager.playShine();
    
    const params = calculateParams(data);
    const analysisResult = matchJewel(params, data.finalColor);
    setResult(analysisResult);
    setScreen('processing');
  };

  const handleProcessingFinish = () => {
    // 結果表示の瞬間に、豊かで美しい結果発表クリスタルチャイム！
    SoundManager.playResult();
    setScreen('result');
  };
  
  const handleRetry = () => {
    SoundManager.playClick();
    setInteractData(null);
    setResult(null);
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-700 overflow-x-hidden">
      {screen !== 'result' && <LsiButterfly />}
      
      {/* 美しいミュート/スピーカー切り替えフローティングボタン */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        {/* 音量ミュート状態の説明テキスト（ボタンの直近にフェードで表示） */}
        <span className="text-[10px] tracking-widest text-slate-500 font-mono hidden sm:inline-block">
          {isMuted ? "SOUND: OFF" : "SOUND: ON"}
        </span>
        <button
          onClick={handleToggleMute}
          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 pointer-events-auto shadow-lg border ${
            isMuted 
              ? 'bg-slate-900/40 border-slate-800 text-slate-500 hover:text-slate-300' 
              : 'bg-indigo-950/40 border-indigo-700/50 text-indigo-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(129,140,248,0.25)]'
          }`}
          style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          title={isMuted ? "音声をオンにする" : "音声をミュートにする"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
        </button>
      </div>

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
