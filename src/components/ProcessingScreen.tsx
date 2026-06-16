import { useEffect } from 'react';
import { motion } from 'motion/react';

interface ProcessingScreenProps {
  onFinish: () => void;
}

export default function ProcessingScreen({ onFinish }: ProcessingScreenProps) {
  useEffect(() => {
    // 結晶化中のアニメーションを見せるためのモック遅延
    const timer = setTimeout(() => {
      onFinish();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center relative p-6"
    >
      {/* 背景の波動 */}
      <motion.div
        animate={{
          scale: [1, 2, 2.5],
          opacity: [0.8, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute w-32 h-32 rounded-full border border-indigo-500/30"
      />
      <motion.div
        animate={{
          scale: [1, 1.8, 2],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeOut"
        }}
        className="absolute w-32 h-32 rounded-full border border-sky-400/20"
      />

      {/* コアの結晶（表現） */}
      <motion.div
        animate={{ 
          rotate: [0, 45, 90, 180, 270, 360],
          borderRadius: ["20%", "30%", "50%", "30%", "20%"]
        }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        className="w-16 h-16 bg-gradient-to-br from-indigo-500/50 to-cyan-300/50 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(100,150,255,0.5)] z-10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center z-10"
      >
        <p className="text-sm tracking-[0.3em] font-light text-slate-300 mb-2">CRYSTALLIZATION IN PROGRESS</p>
        <div className="flex justify-center gap-1">
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-white rounded-full" />
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-white rounded-full" />
          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-white rounded-full" />
        </div>
      </motion.div>

    </motion.div>
  );
}
