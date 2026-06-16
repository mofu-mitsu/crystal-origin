import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const lsiQuotes = [
  "データ収集完了。感情要素は排除しました。",
  "合理的ではありませんね、でも悪くありません。",
  "パラメータの有意な変動を検知。",
  "効率的な研磨を推奨します。",
  "その選択に再現性はありますか？",
  "結果の出力まで、お待ちください。",
  "無駄な動きが多いようです。",
  "興味深い。引き続き観察を続けます。",
];

export default function LsiButterfly({ onTap }: { onTap?: () => void }) {
  const [position, setPosition] = useState({ x: -100, y: 100 });
  const [isVisible, setIsVisible] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);

  // ランダムに飛び回る（たまに現れて消える）
  useEffect(() => {
    const minWait = 10000;
    const maxWait = 25000;
    
    let timeoutId: NodeJS.Timeout;

    const scheduleNextAppearance = () => {
      const waitTime = Math.random() * (maxWait - minWait) + minWait;
      timeoutId = setTimeout(() => {
        // 出現位置をランダムに
        const startX = Math.random() > 0.5 ? -50 : window.innerWidth + 50;
        const startY = Math.random() * (window.innerHeight - 100) + 50;
        setPosition({ x: startX, y: startY });
        
        // すぐに画面内へ
        setTimeout(() => {
          setIsVisible(true);
          const topOffset = window.innerWidth < 768 ? 60 : 20;
          const targetX = Math.max(40, Math.random() * (window.innerWidth - 80));
          const targetY = Math.max(topOffset, Math.random() * (window.innerHeight - 100));
          setPosition({ x: targetX, y: targetY });
        }, 100);

        // 数秒後に消える
        setTimeout(() => {
          setIsVisible(false);
          // 消える位置
          setPosition(prev => ({ x: prev.x > window.innerWidth / 2 ? window.innerWidth + 100 : -100, y: prev.y - 50 }));
          scheduleNextAppearance();
        }, 15000);

      }, waitTime);
    };

    scheduleNextAppearance();
    return () => clearTimeout(timeoutId);
  }, []);

  // 見えている間はたまに少し動く
  useEffect(() => {
    if (!isVisible) return;
    
    const moveAround = setInterval(() => {
      if (Math.random() > 0.6) {
        setPosition(prev => {
          const dx = (Math.random() - 0.5) * 150;
          const dy = (Math.random() - 0.5) * 100;
          return {
             x: Math.max(20, Math.min(window.innerWidth - 60, prev.x + dx)),
             y: Math.max(20, Math.min(window.innerHeight - 80, prev.y + dy))
          };
        });
      }
    }, 3000);
    return () => clearInterval(moveAround);
  }, [isVisible]);

  const handleClick = () => {
    if (onTap) onTap();
    if (quote) return;
    const randomQuote = lsiQuotes[Math.floor(Math.random() * lsiQuotes.length)];
    setQuote(randomQuote);
    setTimeout(() => {
      setQuote(null);
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{
            opacity: 1,
            x: position.x,
            y: position.y
          }}
          transition={{
            duration: 4,
            ease: "easeInOut"
          }}
          onClick={handleClick}
          className="fixed z-50 cursor-pointer pointer-events-auto flex items-center justify-center text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ width: 50, height: 50 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              rotateY: [0, 60, 0, -60, 0]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full flex items-center justify-center"
          >
            🦋
          </motion.div>
          
          <AnimatePresence>
            {quote && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute pointer-events-none -top-8 -left-20 w-56 bg-slate-900/90 border border-slate-700 text-slate-300 text-xs p-3 rounded-lg shadow-xl"
              >
                {quote}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
