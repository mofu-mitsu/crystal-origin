export interface InteractionData {
  timeSpentMs: number;
  clickCount: number;
  mouseDistance: number;
  colorChangeCount: number;
  finalColor: { h: number; s: number; l: number }; // h: 0-360, s: 0-100, l: 0-100
  polishTimeMs: number;
  polishCount: number;
  butterflyClicks?: number; // 新規追加: 蝶のタップ数
}

export interface JewelParams {
  transparency: number; // 透明度 (0-100): 素直さ、わかりやすさ
  hardness: number; // 硬度 (0-100): 精神的タフさ、折れにくさ
  refractive: number; // 屈折率 (0-100): 多角的な視点、迷いやすさ・好奇心
  rarity: number; // 希少性 (0-100): 変わり者度、極端さ
}

export interface JewelResult {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  idealParams: JewelParams;
  colorType: string; // 代表的な色相 (比較用)
  hexColor: string; // UI表示用
}

export interface AnalysisResult {
  mainJewel: JewelResult;
  subJewel: JewelResult;
  hiddenJewel: JewelResult;
  userParams: JewelParams;
}
