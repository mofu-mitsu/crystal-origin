import { motion } from 'motion/react';
import { Sparkles, Home } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative"
    >
      <div className="absolute top-6 left-6">
        <a 
          href="https://mofu-mitsu.github.io/lab.html" 
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>ホームへ戻る</span>
        </a>
      </div>

      <motion.div
        animate={{ 
          boxShadow: ['0px 0px 0px 0px rgba(255,255,255,0)', '0px 0px 40px 10px rgba(255,255,255,0.1)', '0px 0px 0px 0px rgba(255,255,255,0)']
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-slate-800 flex items-center justify-center mb-12 relative"
      >
        <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" strokeWidth={1} />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-slate-900 to-transparent opacity-50" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-3xl sm:text-5xl tracking-widest font-light text-slate-200 mb-2 font-serif">
          CRYSTAL ORIGIN
        </h1>
        <p className="text-indigo-300 tracking-[0.2em] text-xs sm:text-sm font-light mb-8">〜わたしを紐解く宝石診断〜</p>
        <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-12">
          これは、あなたの内なる原石を鑑定するシミュレーター。<br />
          質問に答える必要はありません。<br />
          ただ、直感のままに「光」を探してください。
        </p>

        <button
          onClick={onStart}
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-slate-700 hover:border-slate-400 transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
          <span className="relative text-sm tracking-widest text-slate-300 group-hover:text-white transition-colors duration-500">
            鑑定を始める
          </span>
        </button>
      </motion.div>
    </motion.div>
  );
}
