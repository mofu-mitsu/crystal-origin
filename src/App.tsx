/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, useRef } from 'react';
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
  const [stats, setStats] = useState<{ total: number, match1: number, match2: number, match3: number } | null>(null);
  const fetchingRef = useRef(false);
  const butterflyClicksRef = useRef(0);

  // 初回ロードなどの効果音処理と、ユーザーアクションでのWeb Audioロック解除
  useEffect(() => {
    // 状態を同期
    SoundManager.setMuted(isMuted);

    // ユーザーの最初の操作で AudioContext を確実に活性化 (iOS / Android 対策)
    const handleGesture = () => {
      SoundManager.unlock();
      // 一瞬アンロックが走ったらリスナーを削除する
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  const preloadStats = async (mainId: string, subId: string, hiddenId: string) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const gasUrl = (import.meta as any).env?.VITE_GAS_URL || "https://script.google.com/macros/s/AKfycbwE4WxRj8N7aTQOM-OTUQuXT0jnOqIqhRKOgFrFsO1jhcQU2S-XPn-v1qzhAhMb6TWP/exec";
      if (!gasUrl) {
        setStats({ total: 1024, match1: 156, match2: 12, match3: 1 });
        return;
      }
      const url = new URL(gasUrl);
      url.searchParams.append('main', mainId);
      url.searchParams.append('sub', subId);
      url.searchParams.append('hidden', hiddenId);

      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setStats({ total: data.total, match1: data.match1, match2: data.match2, match3: data.match3 });
      }
    } catch (e) {
      console.error("GAS preload error", e);
      // フォールバック
      setStats({ total: 1, match1: 1, match2: 1, match3: 1 });
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    SoundManager.setMuted(nextMuted);
    
    // 同期的に呼び出し可能にして、Safari等の非同期ブラウザセキュリティブロックを排除する
    if (!nextMuted) {
      SoundManager.playClick();
      SoundManager.startBGM();
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

  const handleButterflyClick = () => {
    butterflyClicksRef.current += 1;
  };

  const handlePolishComplete = (data: InteractionData) => {
    // 磨き完了時にきらきらと輝くサウンド！
    SoundManager.playShine();
    
    // 蝶のタップ数をデータに追加
    const enrichedData = { ...data, butterflyClicks: butterflyClicksRef.current };

    const params = calculateParams(enrichedData);
    const analysisResult = matchJewel(params, enrichedData.finalColor);
    setResult(analysisResult);
    setScreen('processing');

    // お磨き完了 & Processing中の約3〜4秒間に裏で統計情報を事前ロード！
    preloadStats(analysisResult.mainJewel.id, analysisResult.subJewel.id, analysisResult.hiddenJewel.id);
  };

  const handleProcessingFinish = () => {
    // 結果表示の瞬間に、豊かで美しい結果発表クリスタルチャイム！
    SoundManager.playResult();
    setScreen('result');
  };
  
  const handleRetry = () => {
    SoundManager.playClick();
    SoundManager.stopBGM(); // リトライはBGMを一回綺麗にストップ
    setInteractData(null);
    setResult(null);
    setStats(null); // ロード済みのキャッシュ統計をクリア
    fetchingRef.current = false;
    butterflyClicksRef.current = 0; // 蝶のタップ数もリセット
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-slate-700 overflow-x-hidden">
      {screen !== 'result' && <LsiButterfly onTap={handleButterflyClick} />}
      
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
        {screen === 'result' && result && <ResultScreen key="result" result={result} onRetry={handleRetry} preloadedStats={stats} />}
      </AnimatePresence>
    </div>
  );
}
