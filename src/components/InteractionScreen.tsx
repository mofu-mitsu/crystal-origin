import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { InteractionData } from '../types';
import { Disc, MousePointerClick } from 'lucide-react';
import { SoundManager } from '../lib/sound';

interface InteractionScreenProps {
  onComplete: (data: Omit<InteractionData, 'polishTimeMs' | 'polishCount'>) => void;
}

export default function InteractionScreen({ onComplete }: InteractionScreenProps) {
  const [h, setH] = useState(200);
  const [s, setS] = useState(50);
  const [l, setL] = useState(50);
  const [isPressing, setIsPressing] = useState(false);
  
  const startTime = useRef(Date.now());
  const mouseDistance = useRef(0);
  const clickCount = useRef(0);
  const colorChangeCount = useRef(0);
  const lastPos = useRef<{ x: number, y: number } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsPressing(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsPressing(false);
  };

  // トラッキング: マウス移動・タッチ座標から色を算出＆距離を加算
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing) return; // 長押し・ドラッグ時のみ色や移動を反映

    if (lastPos.current) {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      mouseDistance.current += Math.sqrt(dx * dx + dy * dy);
    }
    lastPos.current = { x: e.clientX, y: e.clientY };

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const xRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const yRatio = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

      const newH = Math.round(xRatio * 360);
      const newL = Math.round((1 - yRatio) * 80 + 10); // 10-90% の明度

      if (Math.abs(newH - h) > 5 || Math.abs(newL - l) > 5) {
        colorChangeCount.current += 1;
      }

      setH(newH);
      setL(newL);
    }
  };

  const handleClick = () => {
    clickCount.current += 1;
    // タップ効果音を再生
    SoundManager.playClick();
    // クリックするたびに彩度が変化
    setS(prev => (prev + 20) > 100 ? 20 : prev + 20);
  };

  const handleFinish = () => {
    const timeSpentMs = Date.now() - startTime.current;
    
    // 次の磨き工程へデータを渡す
    onComplete({
      timeSpentMs,
      clickCount: clickCount.current,
      mouseDistance: mouseDistance.current,
      colorChangeCount: colorChangeCount.current,
      finalColor: { h, s, l }
    });
  };

  const currentColor = `hsl(${h}, ${s}%, ${l}%)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onClick={handleClick}
      className="min-h-screen w-full relative overflow-hidden cursor-crosshair touch-none flex flex-col items-center justify-end"
      style={{
        background: `radial-gradient(circle at center, ${currentColor} 0%, #020617 100%)`,
        transition: 'background 0.3s ease-out'
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <div className="z-10 text-center mb-24 pointer-events-none px-6">
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1, duration: 2 }}
        >
          <p className="text-slate-300 font-light tracking-widest text-sm mb-4 drop-shadow-md">
            ドラッグ（長押し）で光を動かし、タップで彩度を変える
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 mb-8 backdrop-blur-sm bg-black/20 rounded-full px-4 py-2 w-fit mx-auto border border-white/5">
            <span className="flex items-center gap-2"><Disc className="w-3 h-3" /> ドラッグ：色・明度探索</span>
            <span className="flex items-center gap-2"><MousePointerClick className="w-3 h-3" /> タップ：彩度調整</span>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="pointer-events-auto px-8 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white tracking-widest text-sm transition-all duration-300 hover:scale-105 active:scale-95"
        >
          原石を取り出す
        </motion.button>
      </div>
    </motion.div>
  );
}
