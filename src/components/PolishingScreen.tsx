import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Sparkles, Pickaxe } from 'lucide-react';
import { InteractionData } from '../types';
import { SoundManager } from '../lib/sound';

interface PolishingScreenProps {
  initialData: Omit<InteractionData, 'polishTimeMs' | 'polishCount'>;
  onComplete: (data: InteractionData) => void;
}

export default function PolishingScreen({ initialData, onComplete }: PolishingScreenProps) {
  const [polishCount, setPolishCount] = useState(0);
  const startTime = useRef(Date.now());
  const lastPos = useRef<{ x: number, y: number } | null>(null);
  const crystalControls = useAnimation();

  useEffect(() => {
    // 10秒経ったら、または100回以上磨かれたら「鑑定へ向かう」ボタンを出したいが、今回はボタンで明示的に進ませる
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (lastPos.current) {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // 一定以上の距離を動かしたら1回磨いたと判定
      if (dist > 20) {
        setPolishCount(prev => prev + 1);
        lastPos.current = { x: e.clientX, y: e.clientY };
        
        // お磨きSEを再生（シンセサイザー）
        SoundManager.playPolish();
        
        // 石を揺らすアニメーション
        crystalControls.start({
          x: [0, -2, 2, -1, 1, 0],
          y: [0, -1, 1, 0, 0, 0],
          transition: { duration: 0.2 }
        });
      }
    } else {
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    lastPos.current = null;
  };

  const handleFinish = () => {
    const polishTimeMs = Date.now() - Math.max(startTime.current, Date.now() - 60000); // Max 60s record
    onComplete({
      ...initialData,
      polishTimeMs,
      polishCount
    });
  };

  // 磨けば磨くほど不透明な形から、光る形へ
  const polishProgress = Math.min(100, Math.round((polishCount / 50) * 100)); // 50回くらいで100%
  const opacity = 0.2 + (polishProgress / 100) * 0.8;
  const blur = Math.max(0, 10 - (polishProgress / 10));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="min-h-screen w-full relative bg-slate-950 flex flex-col items-center justify-center cursor-crosshair touch-none select-none"
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }} />

      <motion.div
        animate={crystalControls}
        style={{ opacity, filter: `blur(${blur}px)` }}
        className="relative w-48 h-48 sm:w-64 sm:h-64 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        {/* 原石のシルエット */}
        <div 
          className="absolute inset-0 bg-slate-800 rounded-3xl rotate-45 transform"
          style={{
            boxShadow: polishCount > 0 ? `0 0 ${polishCount}px rgba(255, 255, 255, ${polishProgress/100})` : 'none'
          }}
        />
        <div 
           className="absolute inset-2 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-2xl rotate-[30deg] transform opacity-80"
        />
        {polishCount > 20 && (
           <Sparkles className="absolute text-white/50 w-8 h-8 top-4 right-4 animate-pulse" />
        )}
      </motion.div>

      <div className="z-20 mt-24 text-center px-4">
        <p className="text-slate-400 font-light tracking-widest text-sm mb-4">
          原石の形が見えてきました。<br />
          画面をこすって、納得がいくまで磨き上げてください。
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-8 font-mono">
          <Pickaxe className="w-4 h-4" />
          <span>POLISH: {polishCount}</span>
        </div>

        <motion.button
          onClick={handleFinish}
          className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white cursor-pointer tracking-widest text-sm transition-all duration-300"
        >
          鑑定へ進む
        </motion.button>
      </div>
    </motion.div>
  );
}
