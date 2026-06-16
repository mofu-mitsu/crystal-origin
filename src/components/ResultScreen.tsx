import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AnalysisResult, JewelResult } from '../types';
import { Sparkles, Gem, Download, Share2, Home } from 'lucide-react';
import { toPng } from 'html-to-image';
import JewelRecommendation from './JewelRecommendation';

interface ResultScreenProps {
  result: AnalysisResult;
  onRetry: () => void;
}

export default function ResultScreen({ result, onRetry }: ResultScreenProps) {
  const { mainJewel, subJewel, hiddenJewel, userParams } = result;
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null); // 隠しキャプチャ用
  const fetchedRef = useRef(false);
  const [isExporting, setIsExporting] = useState(false);
  const [stats, setStats] = useState<{ total: number, match1: number, match2: number, match3: number } | null>(null);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchStats = async () => {
      try {
        const gasUrl = (import.meta as any).env?.VITE_GAS_URL || "https://script.google.com/macros/s/AKfycbwE4WxRj8N7aTQOM-OTUQuXT0jnOqIqhRKOgFrFsO1jhcQU2S-XPn-v1qzhAhMb6TWP/exec";
        // 未設定の場合はデモ用のモックデータを表示する（もしURLが無効だった場合はフォールバック）
        if (!gasUrl) {
          setTimeout(() => {
            setStats({ total: 1024, match1: 156, match2: 12, match3: 1 });
          }, 1200);
          return;
        }

        const url = new URL(gasUrl);
        url.searchParams.append('main', mainJewel.id);
        url.searchParams.append('sub', subJewel.id);
        url.searchParams.append('hidden', hiddenJewel.id);

        const res = await fetch(url.toString());
        const data = await res.json();
        if (data.success) {
          setStats({ total: data.total, match1: data.match1, match2: data.match2, match3: data.match3 });
        }
      } catch (e) {
        console.error("GAS fetch error", e);
        // エラー時はフェールセーフとして読み込み中を解除し、モックか0を設定する
        setStats({ total: 1, match1: 1, match2: 1, match3: 1 });
      }
    };
    fetchStats();
  }, [mainJewel.id, subJewel.id, hiddenJewel.id]);

  const handleDownload = async () => {
    const target = captureRef.current || resultRef.current;
    if (!target) return;
    setIsExporting(true);
    // レンダリング更新を待つ
    await new Promise(resolve => setTimeout(resolve, 350));
    try {
      const dataUrl = await toPng(target, {
        cacheBust: true,
        backgroundColor: '#020617',
        pixelRatio: Math.min(2, window.devicePixelRatio || 2), // スマホでもクラッシュしない適正な標準高画質上限
        style: {
          transform: 'none',
          margin: '0',
          width: '1024px',
          height: 'auto',
        }
      });
      
      if (dataUrl && dataUrl.length > 200) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `crystal-origin-${Date.now()}.png`;
        a.click();
        
        // 効果音を鳴らす
        SoundManager.playShine();
      } else {
        throw new Error("Generated image content is blank");
      }
    } catch (e) {
      console.error("Download failed to generate image smoothly", e);
      alert('画像の生成に少し時間がかかるか、環境によってブロックされた可能性があります。画像が写真フォルダに保存されていない場合は、お手数ですがスクリーンショットを撮影して保存してくださいませ！');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CRYSTAL ORIGIN 〜わたしを紐解く宝石診断〜',
          text: `私の主結晶は【${mainJewel.name}】でした。\nあなたの内なる原石は？\n#クリスタルオリジン #わたしを紐解く宝石診断\n`,
          url: window.location.href,
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      // 共有に非対応の場合でも、クリップボードへのコピーをおこなって利便性をあげる！
      try {
        await navigator.clipboard.writeText(
          `私の主結晶は【${mainJewel.name}】でした。\nあなたの内なる原石は？\n#クリスタルオリジン #わたしを紐解く宝石診断\n${window.location.href}`
        );
        alert("診断結果をクリップボードにコピーしました！\nSNSなどに貼り付けてシェアしてください。");
      } catch {
        alert("お使いのブラウザは共有機能に対応していません。\n画像保存をご利用ください！");
      }
    }
  };

  const renderBar = (label: string, value: number, max: number = 100, isCapture = false) => {
    const blockCount = 10;
    const filledBlocks = Math.round((value / max) * blockCount);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-350 mb-1.5 tracking-widest font-semibold">
          <span>{label}</span>
          <span className="font-mono text-indigo-300 font-bold">{value}</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: blockCount }).map((_, i) => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-sm transition-all duration-500 ${
                i < filledBlocks 
                  ? (isCapture ? 'bg-indigo-400' : 'bg-indigo-400/90 shadow-[0_0_8px_rgba(129,140,248,0.5)]') 
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const JewelCard = ({ title, jewel, isMain = false, isCapture = false }: { title: string, jewel: JewelResult, isMain?: boolean, isCapture?: boolean }) => (
    <div
      className={`relative p-6 rounded-2xl border ${
        isCapture
          ? (isMain ? 'border-indigo-500/80 bg-[#0f172a]' : 'border-slate-800 bg-[#0c1222]')
          : (isMain ? 'border-indigo-500/60 shadow-[0_0_25px_rgba(99,102,241,0.35)] bg-slate-800/70 backdrop-blur-xl' : 'border-slate-700/80 shadow-md bg-slate-800/30 backdrop-blur-xl')
      } overflow-hidden ${isMain ? 'md:col-span-2' : ''}`}
    >
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: jewel.hexColor }}
      />
      <p className={`text-[10px] tracking-[0.2em] mb-2 font-mono uppercase ${isMain ? 'text-indigo-300 font-bold' : 'text-slate-400 font-medium'}`}>{title}</p>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
           <Gem className="absolute w-10 h-10 opacity-50 blur-[3px]" style={{ color: jewel.hexColor, fill: jewel.hexColor }} />
           <Gem className="absolute w-8 h-8" style={{ color: jewel.hexColor, fill: jewel.hexColor, fillOpacity: 0.3 }} strokeWidth={1.5} />
           <div className="w-1.5 h-1.5 rounded-full absolute -top-1 right-0" style={{ backgroundColor: '#fff', boxShadow: `0 0 8px 1px ${jewel.hexColor}` }} />
        </div>
        <h2 className={`text-2xl font-semibold tracking-wider text-white ${isMain ? 'text-3xl md:text-4xl font-serif font-medium' : ''}`} style={{ textShadow: `0 0 15px ${jewel.hexColor}80` }}>{jewel.name}</h2>
      </div>
      <p className={`text-base font-semibold tracking-wide mb-3 ${isMain ? 'text-indigo-100 text-lg md:text-xl' : 'text-slate-100'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{jewel.subtitle}</p>
      <p className="text-sm text-slate-200 leading-relaxed font-normal" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}>{jewel.description}</p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full p-4 sm:p-8 max-w-5xl mx-auto overflow-y-auto pb-32"
    >
      <div className="flex justify-between items-center mb-8">
        <a 
          href="https://mofu-mitsu.github.io/lab.html" 
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>ホームへ戻る</span>
        </a>
      </div>

      {/* 通常の表示用コンテナ (画面幅に追従) */}
      <div ref={resultRef} className="p-4 sm:p-8 bg-slate-950 rounded-3xl overflow-hidden border border-slate-900/60 shadow-2xl">
        <div className="flex items-center justify-center gap-8 mb-12 border-b border-slate-800/60 pb-8">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          <h1 className="text-xl md:text-2xl tracking-[0.4em] font-light text-slate-100 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">鑑定結果</h1>
          <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <JewelCard title="主結晶 (MAIN CRYSTAL)" jewel={mainJewel} isMain={true} />
            <JewelCard title="副結晶 (SUB CRYSTAL)" jewel={subJewel} />
            <JewelCard title="隠し結晶 (HIDDEN CRYSTAL)" jewel={hiddenJewel} />
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30">
              <p className="text-[10px] tracking-widest text-slate-500 mb-6 font-mono border-b border-slate-800 pb-2">解析パラメータ</p>
              {renderBar("透明度 / 素直さ", userParams.transparency)}
              {renderBar("硬度 / タフさ", userParams.hardness)}
              {renderBar("屈折率 / 多角視点", userParams.refractive)}
              {renderBar("希少性 / 独自性", userParams.rarity)}
            </div>
            
            <div className="p-6 rounded-2xl border border-indigo-900/30 bg-indigo-950/20 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] tracking-widest text-indigo-400/60 mb-4 font-mono uppercase">世界との共鳴度</p>
              {stats ? (
                <div className="text-[11px] text-slate-300 font-light leading-relaxed space-y-2 w-full">
                  <div className="flex justify-between items-center px-2">
                    <span>主結晶が同じ人</span>
                    <span className="font-medium text-indigo-300 text-sm">{stats.match1} <span className="text-[10px] text-slate-500 font-normal">人</span></span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span>主と副が同じ人</span>
                    <span className="font-medium text-indigo-300 text-sm">{stats.match2} <span className="text-[10px] text-slate-500 font-normal">人</span></span>
                  </div>
                  <div className="flex justify-between items-center px-2 border-b border-indigo-900/30 pb-3 mb-2">
                    <span>3種類すべて同じ人</span>
                    <span className="font-medium text-indigo-300 text-sm">{stats.match3} <span className="text-[10px] text-slate-500 font-normal">人</span></span>
                  </div>
                  <p className="opacity-60 text-[10px] pt-1 mt-2">総鑑定人数：{stats.total}人</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 animate-pulse py-8">統計データを照会中...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 隠しキャプチャ専用コンテナ (常に1024px幅の横長デスクトップ配置をキープ) */}
      {/* ========================================================= */}
      <div className="absolute left-[-9999px] top-0 pointer-events-none" style={{ width: '1024px' }}>
        <div 
          ref={captureRef} 
          className="p-8 bg-slate-950 rounded-3xl overflow-hidden border border-slate-900"
          style={{ width: '1024px', boxSizing: 'border-box' }}
        >
          <div className="flex items-center justify-center gap-8 mb-12 border-b border-slate-800 pb-8">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h1 className="text-2xl tracking-[0.4em] font-light text-slate-100">鑑定結果</h1>
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>

          {/* 強制3カラム配置 */}
          <div className="grid grid-cols-3 gap-6 mb-8 w-full">
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {/* PC表示用の横並びカード */}
              <JewelCard title="主結晶 (MAIN CRYSTAL)" jewel={mainJewel} isMain={true} isCapture={true} />
              <div className="flex flex-col gap-6">
                <JewelCard title="副結晶 (SUB CRYSTAL)" jewel={subJewel} isCapture={true} />
                <JewelCard title="隠し結晶 (HIDDEN CRYSTAL)" jewel={hiddenJewel} isCapture={true} />
              </div>
            </div>
            
            <div className="flex flex-col gap-6 col-span-1">
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0c1222]">
                <p className="text-[10px] tracking-widest text-slate-500 mb-6 font-mono border-b border-slate-800 pb-2">解析パラメータ</p>
                {renderBar("透明度 / 素直さ", userParams.transparency, 100, true)}
                {renderBar("硬度 / タフさ", userParams.hardness, 100, true)}
                {renderBar("屈折率 / 多角視点", userParams.refractive, 100, true)}
                {renderBar("希少性 / 独自性", userParams.rarity, 100, true)}
              </div>
              
              <div className="p-6 rounded-2xl border border-indigo-900/30 bg-[#0f112c] flex flex-col items-center justify-center text-center">
                <p className="text-[10px] tracking-widest text-indigo-400/60 mb-4 font-mono uppercase">世界との共鳴度</p>
                {stats ? (
                  <div className="text-[11px] text-slate-300 font-light leading-relaxed space-y-2 w-full">
                    <div className="flex justify-between items-center px-2">
                      <span>主結晶が同じ人</span>
                      <span className="font-medium text-indigo-300 text-sm">{stats.match1} 人</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                      <span>主と副が同じ人</span>
                      <span className="font-medium text-indigo-300 text-sm">{stats.match2} 人</span>
                    </div>
                    <div className="flex justify-between items-center px-2 border-b border-indigo-900/30 pb-3 mb-2">
                      <span>3種類すべて同じ人</span>
                      <span className="font-medium text-indigo-300 text-sm">{stats.match3} 人</span>
                    </div>
                    <p className="opacity-60 text-[10px] pt-1 mt-2">総鑑定人数：{stats.total}人</p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-8">統計データを同期中...</p>
                )}
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-slate-600 pt-8 border-t border-slate-900/50 font-mono tracking-widest uppercase">
            CRYSTAL ORIGIN 〜わたしを紐解く宝石診断〜
          </div>
        </div>
      </div>
      {/* ========================================================= */}

      <JewelRecommendation jewelName={mainJewel.name} />

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent flex justify-center gap-4 z-20">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 border border-indigo-500/30 rounded-full transition-colors duration-300"
        >
          <Share2 className="w-4 h-4" />
          <span>結果をシェア</span>
        </button>
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 text-sm tracking-widest text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 bg-slate-900 rounded-full transition-colors duration-300"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? '画像を生成中...' : '画像保存'}</span>
        </button>
        <button
          onClick={onRetry}
          className="px-6 py-3 text-sm tracking-widest text-slate-400 hover:text-white transition-colors duration-300"
        >
          やり直す
        </button>
      </div>
    </motion.div>
  );
}
