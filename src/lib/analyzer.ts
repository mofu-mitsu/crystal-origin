import { InteractionData, JewelParams, JewelResult, AnalysisResult } from '../types';
import { jewels } from '../data/jewels';

function hexToHsl(hex: string): { h: number, s: number, l: number } {
  hex = hex.replace(/^#/, '');
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function colorDistance(hsl1: { h: number, s: number, l: number }, hsl2: { h: number, s: number, l: number }): number {
  let hDiff = Math.abs(hsl1.h - hsl2.h);
  if (hDiff > 180) hDiff = 360 - hDiff;
  const hScore = (hDiff / 180) * 100;
  
  const sDiff = Math.abs(hsl1.s - hsl2.s);
  const lDiff = Math.abs(hsl1.l - hsl2.l);

  // パステルカラー（ピンクなど）が白判定されないよう、無彩色の閾値を厳しくする
  const isAchromatic1 = hsl1.s < 12 || hsl1.l < 12 || hsl1.l > 95;
  const isAchromatic2 = hsl2.s < 12 || hsl2.l < 12 || hsl2.l > 95;

  if (isAchromatic1 || isAchromatic2) {
    return (sDiff * 1.5) + (lDiff * 2.5); // 無彩色は彩度と明度の差を重視
  }

  return (hScore * 3.0) + (sDiff * 0.4) + (lDiff * 0.4); // 有彩色は色相の差を最重視
}

/**
 * ユーザーの行動データから性格パラメータ（0〜100）を算出する。
 */
export function calculateParams(data: InteractionData): JewelParams {
  // 1. 透明度 (Transparency): 迷いのなさ、素直さ
  // クリック数が少なく、色が明るい（明度Lが高い）ほど透明度が高い
  const clickFactorT = Math.max(0, 100 - data.clickCount * 2);
  const lightnessFactor = data.finalColor.l;
  const polishTBonus = Math.min(15, data.polishCount * 0.05); // 磨いた分だけ少し透明感アップ
  
  let transparency = Math.round((clickFactorT * 0.4) + (lightnessFactor * 0.6) + polishTBonus);

  // 2. 硬度 (Hardness): 精神的タフさ、折れない心、努力の量
  // 磨いた時間と回数が硬度（タフさ）を大きく底上げする
  const timeSeconds = data.timeSpentMs / 1000;
  const timeScore = Math.min(100, (timeSeconds / 180) * 100); 
  const distanceScore = Math.min(100, (data.mouseDistance / 5000) * 100); 
  const polishScore = Math.min(100, (data.polishCount / 200) * 100); // 200回磨いたら満点に修正してキャンディーフローライト等に出やすくする
  
  let hardness = Math.round((timeScore * 0.2) + (distanceScore * 0.3) + (polishScore * 0.5));

  // 3. 屈折率 (Refractive): 多角的な視点、迷いやすさ・好奇心
  // カラー変更回数、クリック数が多いほど多角的に物事を見ている
  const colorChangeScore = Math.min(100, data.colorChangeCount * 4);
  const clickFactorR = Math.min(100, data.clickCount * 5);
  const refractive = Math.round((colorChangeScore * 0.6) + (clickFactorR * 0.4));

  // 4. 希少性 (Rarity): 変わり者度、極端さ、または隠し要素（蝶）の発見！
  // 各パラメータが極端に高いか低い場合、または蝶をクリックした場合に希少性が上がる
  const isExtreme = (val: number) => Math.abs(val - 50) * 2; // 50から離れるほど高い (0~100)
  const extremeH = isExtreme(data.finalColor.h / 3.6);
  const extremeS = isExtreme(data.finalColor.s);
  const extremeL = isExtreme(data.finalColor.l);
  
  let anomalyScore = 0;
  if (timeSeconds > 45 && data.mouseDistance < 800) anomalyScore += 30; // じーっと考えてる
  if (timeSeconds < 6 && data.clickCount > 8) anomalyScore += 35; // 連打
  if (data.finalColor.s === 100 && data.finalColor.l === 50) anomalyScore += 20; // 原色
  if (data.polishCount > 300) anomalyScore += 45; // たくさん磨いたご褒美
  
  const butterflyBonus = Math.min(60, (data.butterflyClicks || 0) * 20); // 蝶1回で+20%レア度。最大60！

  const rarity = Math.min(100, Math.round((extremeH * 0.15 + extremeS * 0.2 + extremeL * 0.15 + anomalyScore * 0.5 + butterflyBonus)));

  return {
    transparency: clamp(transparency, 0, 100),
    hardness: clamp(hardness, 0, 100),
    refractive: clamp(refractive, 0, 100),
    rarity: clamp(rarity, 0, 100)
  };
}

/**
 * 算出されたパラメータに最も近い宝石を見つける
 */
export function matchJewel(userParams: JewelParams, finalColor: { h: number, s: number, l: number }): AnalysisResult {
  // 1. メイン宝石とサブ宝石の決定 (ユークリッド距離 + 色距離)
  let distances = jewels.map(jewel => {
    // 4つの属性すべてを調和させるために4次元のパラメータ空間で距離を算出
    // 2乗(2.0)にすることで負の数でも問題なくリアルな距離が計算できるように修正
    const paramDist = Math.sqrt(
      Math.pow(jewel.idealParams.transparency - userParams.transparency, 2) +
      Math.pow(jewel.idealParams.hardness - userParams.hardness, 2) +
      Math.pow(jewel.idealParams.refractive - userParams.refractive, 2) +
      Math.pow(jewel.idealParams.rarity - userParams.rarity, 2)
    );

    const jewelHsl = hexToHsl(jewel.hexColor);
    const colorDist = colorDistance(finalColor, jewelHsl);

    // 色へのマッチング精度を高めるため、色距離の比重を少し上げて1.5にする
    const dist = paramDist + (colorDist * 1.5);
    return { jewel, dist };
  });

  // 距離が近い順にソート
  distances.sort((a, b) => a.dist - b.dist);
  
  let bestMatch = distances[0].jewel;
  let secondMatch = distances[1].jewel;
  
  // メインとサブが絶対に被らないようにする
  if (secondMatch.id === bestMatch.id) {
    secondMatch = distances[2].jewel;
  }

  // 隠し結晶 (Hidden Jewel) の決定
  // 毎回同じにならないよう、高レアリティ（60以上）の中から、メイン及びサブ以外のものをランダムに決定する！
  let highRarityJewels = jewels.filter(j => j.idealParams.rarity >= 60 && j.id !== bestMatch.id && j.id !== secondMatch.id);
  if (highRarityJewels.length === 0) {
    highRarityJewels = jewels.filter(j => j.id !== bestMatch.id && j.id !== secondMatch.id);
  }
  
  // 完全なランダム性
  const randomIndex = Math.floor(Math.random() * highRarityJewels.length);
  const hiddenMatch = highRarityJewels[randomIndex] || jewels[2];

  return {
    mainJewel: bestMatch,
    subJewel: secondMatch,
    hiddenJewel: hiddenMatch,
    userParams
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
