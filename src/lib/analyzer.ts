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

  const isAchromatic1 = hsl1.s < 20 || hsl1.l < 20 || hsl1.l > 85;
  const isAchromatic2 = hsl2.s < 20 || hsl2.l < 20 || hsl2.l > 85;

  if (isAchromatic1 || isAchromatic2) {
    return (sDiff * 1.5) + (lDiff * 2.0); // 無彩色は彩度と明度の差を重視
  }

  return (hScore * 2.5) + (sDiff * 0.5) + (lDiff * 0.5); // 有彩色は色相の差を最重視
}

/**
 * ユーザーの行動データから性格パラメータ（0〜100）を算出する。
 */
export function calculateParams(data: InteractionData): JewelParams {
  // 1. 透明度 (Transparency): 迷いのなさ、素直さ
  // クリック数が少なく、色が明るい（明度Lが高い）ほど透明度が高い
  // また、磨きすぎ（polishCount大）は「加工された」として少し透明度が下がる（素のままではない）
  const clickFactorT = Math.max(0, 100 - data.clickCount * 3);
  const lightnessFactor = data.finalColor.l;
  let transparency = Math.round((clickFactorT * 0.4) + (lightnessFactor * 0.6));
  transparency -= (data.polishCount * 0.05);

  // 2. 硬度 (Hardness): 精神的タフさ、折れない心、努力の量
  // 磨いた時間と回数が硬度（タフさ）を大きく底上げする
  const timeSeconds = data.timeSpentMs / 1000;
  const timeScore = Math.min(100, (timeSeconds / 180) * 100);
  const distanceScore = Math.min(100, (data.mouseDistance / 10000) * 100);
  const polishScore = Math.min(100, (data.polishCount / 500) * 100); // 500回磨いたらMax追加
  
  let hardness = Math.round((timeScore * 0.3) + (distanceScore * 0.3) + (polishScore * 0.4));

  // 3. 屈折率 (Refractive): 多角的な視点、迷いやすさ・好奇心
  // カラー変更回数、クリック数が多いほど多角的に物事を見ている
  const colorChangeScore = Math.min(100, data.colorChangeCount * 2);
  const clickFactorR = Math.min(100, data.clickCount * 4);
  const refractive = Math.round((colorChangeScore * 0.7) + (clickFactorR * 0.3));

  // 4. 希少性 (Rarity): 変わり者度、極端さ
  // 各パラメータが極端に高いか低い場合、希少性が上がる
  const isExtreme = (val: number) => Math.abs(val - 50) * 2; // 50から離れるほど高い (0~100)
  const extremeH = isExtreme(data.finalColor.h / 3.6); // 色の特異性
  const extremeS = isExtreme(data.finalColor.s);
  const extremeL = isExtreme(data.finalColor.l);
  
  let anomalyScore = 0;
  if (timeSeconds > 60 && data.mouseDistance < 1000) anomalyScore += 30; // じーっと考えてる
  if (timeSeconds < 5 && data.clickCount > 10) anomalyScore += 30; // 狂ったように連打
  if (data.finalColor.s === 100 && data.finalColor.l === 50) anomalyScore += 20; // 完璧な原色
  if (data.polishCount > 1000) anomalyScore += 40; // 異常な回数磨いた場合

  const rarity = Math.min(100, Math.round((extremeH * 0.2 + extremeS * 0.3 + extremeL * 0.3 + anomalyScore)));

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
    let rarityPenalty = 0;
    if (jewel.idealParams.rarity > userParams.rarity) {
       rarityPenalty = (jewel.idealParams.rarity - userParams.rarity) * 2.5; // ペナルティ倍率強化
    }

    const jewelHsl = hexToHsl(jewel.hexColor);
    const colorDist = colorDistance(finalColor, jewelHsl);

    const paramDist = Math.sqrt(
      Math.pow(jewel.idealParams.transparency - userParams.transparency, 2) +
      Math.pow(jewel.idealParams.hardness - userParams.hardness, 2) +
      Math.pow(jewel.idealParams.refractive - userParams.refractive, 2)
    );

    const dist = paramDist + rarityPenalty + (colorDist * 0.6); // 色距離を強く反映
    return { jewel, dist };
  });

  // 距離が近い順にソート
  distances.sort((a, b) => a.dist - b.dist);
  
  let bestMatch = distances[0].jewel;
  let secondMatch = distances[1].jewel;
  let hiddenMatch: JewelResult;

  const seed = userParams.transparency + userParams.hardness + userParams.refractive + userParams.rarity;
  let highRarityJewels = jewels.filter(j => j.idealParams.rarity >= 70 && j.id !== bestMatch.id && j.id !== secondMatch.id);
  if (highRarityJewels.length === 0) {
    highRarityJewels = jewels.filter(j => j.id !== bestMatch.id && j.id !== secondMatch.id);
  }
  const index = seed % highRarityJewels.length;
  hiddenMatch = highRarityJewels[index] || jewels[2];

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
