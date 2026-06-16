import { JewelResult } from '../types';

export const jewels: JewelResult[] = [
  {
    id: "ruby",
    name: "ルビー",
    subtitle: "尽きることのない情熱",
    description: "情熱的で一直線。決断が早く、「これ」と決めたものに対する行動力は誰にも負けません。困難にも負けない強い芯（タフさ）を持っています。",
    idealParams: { transparency: 30, hardness: 98, refractive: 50, rarity: 60 },
    colorType: "red",
    hexColor: "#E0115F"
  },
  {
    id: "sapphire",
    name: "サファイア",
    subtitle: "静かなる知性と冷静",
    description: "常に冷静で知性的。感情に流されず、物事をロジカルに分析します。確固たる意志を持ち、周囲が慌てている時ほど頼りになる存在です。",
    idealParams: { transparency: 70, hardness: 95, refractive: 60, rarity: 60 },
    colorType: "blue",
    hexColor: "#0F52BA"
  },
  {
    id: "garnet",
    name: "ガーネット",
    subtitle: "積み重ねた努力の結晶",
    description: "コツコツと努力を積み重ねることができる大器晩成型。派手さはなくても、その堅実さと決して折れない心は、確かな信頼を生み出します。",
    idealParams: { transparency: 20, hardness: 85, refractive: 40, rarity: 40 },
    colorType: "darkred",
    hexColor: "#733635"
  },
  {
    id: "amethyst",
    name: "アメジスト",
    subtitle: "冷静と情熱の狭間",
    description: "一見クールに見えますが、内側には熱い想いを秘めています。直感と論理のバランスが良く、人を癒やす不思議な魅力を持った人物です。",
    idealParams: { transparency: 60, hardness: 75, refractive: 70, rarity: 50 },
    colorType: "purple",
    hexColor: "#9966CC"
  },
  {
    id: "emerald",
    name: "エメラルド",
    subtitle: "深い調和と叡智",
    description: "知性と協調性をあわせ持ち、周囲の人々に安心感を与えます。ただ優しいだけでなく、本質を見抜く鋭い目と深い思考力を持っています。",
    idealParams: { transparency: 40, hardness: 80, refractive: 65, rarity: 75 },
    colorType: "green",
    hexColor: "#50C878"
  },
  {
    id: "diamond",
    name: "ダイヤモンド",
    subtitle: "完璧を求める無垢な光",
    description: "一切の妥協を許さない完璧主義者。透明な心と、どんなことにも屈しない圧倒的なメンタルの強さを持ち、自ら輝きを放ちます。",
    idealParams: { transparency: 100, hardness: 100, refractive: 90, rarity: 80 },
    colorType: "white",
    hexColor: "#B9F2FF"
  },
  {
    id: "topaz",
    name: "トパーズ",
    subtitle: "道を照らす希望の光",
    description: "明るく前向きで、周囲に希望を与えます。物事の多面的な価値を見出すのが得意で、暗闇の中でも自分の信じる道を見つけることができます。",
    idealParams: { transparency: 80, hardness: 85, refractive: 80, rarity: 50 },
    colorType: "yellow",
    hexColor: "#FFC87C"
  },
  {
    id: "peridot",
    name: "ペリドット",
    subtitle: "暗闇を払う太陽の欠片",
    description: "ポジティブで楽天的。細かいことにこだわらず、直感のままに動きます。裏表のない素直な性格で、場をパッと明るくする太陽のような存在です。",
    idealParams: { transparency: 90, hardness: 70, refractive: 50, rarity: 45 },
    colorType: "yellowgreen",
    hexColor: "#E6E200"
  },
  {
    id: "labradorite",
    name: "ラブラドライト",
    subtitle: "内に秘めた宇宙の直感",
    description: "一見すると地味かもしれませんが、特定の光（状況）が当たると誰も思いつかないような閃きや才能を発揮します。直感が非常に鋭いタイプです。",
    idealParams: { transparency: 10, hardness: 65, refractive: 95, rarity: 70 },
    colorType: "grey",
    hexColor: "#6C7A89"
  },
  {
    id: "alexandrite",
    name: "アレキサンドライト",
    subtitle: "昼と夜を統べる二面性",
    description: "状況や会う人によって、見せる顔がガラリと変わります。環境への適応力が限界を超えており、時には自分でもどの自分が本物か迷うほどの多面性を持っています。",
    idealParams: { transparency: 50, hardness: 85, refractive: 100, rarity: 95 },
    colorType: "multi",
    hexColor: "#006B54"
  },
  {
    id: "tanzanite",
    name: "タンザナイト",
    subtitle: "柔軟な価値観の変容",
    description: "固定観念に縛られず、新しい価値観を柔軟に受け入れます。多角的に物事を見る視点を持っており、人生の転換期に強いタイプです。",
    idealParams: { transparency: 75, hardness: 70, refractive: 85, rarity: 85 },
    colorType: "bluepurple",
    hexColor: "#333399"
  },
  {
    id: "moonstone",
    name: "ムーンストーン",
    subtitle: "月灯りのような感受性",
    description: "非常に感受性が強く、他人の感情の機微を敏感に察知します。少し傷つきやすい面もありますが、その分だけ人に対して深い優しさを持っています。",
    idealParams: { transparency: 30, hardness: 40, refractive: 75, rarity: 55 },
    colorType: "whiteblue",
    hexColor: "#E5E9F0"
  },
  {
    id: "opal",
    name: "オパール",
    subtitle: "予測不能な独創の虹",
    description: "決まったルールや型にはまることを極端に嫌います。縛られることなく、自由な発想と圧倒的な独創性で、毎日違う輝きを見せる自由人です。",
    idealParams: { transparency: 40, hardness: 50, refractive: 100, rarity: 80 },
    colorType: "rainbow",
    hexColor: "#F4D03F"
  },
  {
    id: "aquamarine",
    name: "アクアマリン",
    subtitle: "すべてを包み込む海",
    description: "穏やかで心が広く、濁りのない素直な心の持ち主。あなたの周りには自然と人が集まり、コミュニケーションを円滑にする清涼剤のような存在です。",
    idealParams: { transparency: 95, hardness: 75, refractive: 45, rarity: 50 },
    colorType: "lightblue",
    hexColor: "#7FFFD4"
  },
  {
    id: "citrine",
    name: "シトリン",
    subtitle: "光を集める陽気な風",
    description: "好奇心旺盛で、新しいことに挑戦するのが大好き。明るく社交的で、少しの失敗は笑って吹き飛ばす、非常にポジティブなエネルギーに満ちています。",
    idealParams: { transparency: 85, hardness: 65, refractive: 70, rarity: 40 },
    colorType: "yellow",
    hexColor: "#E4D00A"
  },
  {
    id: "rosequartz",
    name: "ローズクォーツ",
    subtitle: "傷を包み込む無償の愛",
    description: "自分よりも他人を優先してしまうほどの優しさを持っています。争いを好まず、どんな人にも安心感を与えられる、愛情に満ちた包容力の持ち主です。",
    idealParams: { transparency: 50, hardness: 55, refractive: 60, rarity: 40 },
    colorType: "pink",
    hexColor: "#FFC0CB"
  },
  {
    id: "celestite",
    name: "セレスタイト",
    subtitle: "静寂を愛する深い思索",
    description: "大勢で騒ぐよりも、一人の静かな場所で深く考えることを好みます。精神性が高く、独特の哲学を持っており、周囲からは少し不思議でミステリアスに見られます。",
    idealParams: { transparency: 95, hardness: 40, refractive: 98, rarity: 75 },
    colorType: "lightblue",
    hexColor: "#B2FFFF"
  },
  {
    id: "sphene",
    name: "スフェーン",
    subtitle: "溢れ出す多色な好奇心",
    description: "ひとつのことに執着せず、興味の対象が次々と移り変わります。ダイヤモンドをも凌ぐと言われるその分散率は、あなたが持つ計り知れない多才さの証です。",
    idealParams: { transparency: 60, hardness: 55, refractive: 100, rarity: 70 },
    colorType: "yellowgreen",
    hexColor: "#9ACD32"
  },
  {
    id: "benitoite",
    name: "ベニトアイト",
    subtitle: "気高き孤高の青",
    description: "滅多に他人に心を開きませんが、一度心を開いた相手には強い誠実さを見せます。群れることを嫌い、自分だけの強い美学と誇りを持って生きています。",
    idealParams: { transparency: 85, hardness: 60, refractive: 90, rarity: 85 },
    colorType: "blue",
    hexColor: "#00008B"
  },
  {
    id: "paraibatourmaline",
    name: "パライバトルマリン",
    subtitle: "世界を照らす鮮烈な個",
    description: "どこにいても隠しきれない圧倒的な個性とオーラを放っています。常識の枠には全く収まらず、その存在自体が奇跡のような、超希少なカリスマタイプです。",
    idealParams: { transparency: 80, hardness: 75, refractive: 80, rarity: 100 },
    colorType: "neonblue",
    hexColor: "#1ABEDF"
  },
  {
    id: "euclase",
    name: "ユークレース",
    subtitle: "儚きゆえの美しさ",
    description: "非常に繊細で、環境の変化や他人の何気ない言葉に傷つきやすい一面があります。しかし、その崩れやすさ（脆さ）こそが、あなたの感受性の美しさでもあります。",
    idealParams: { transparency: 90, hardness: 20, refractive: 75, rarity: 90 },
    colorType: "blueclear",
    hexColor: "#87CEEB"
  },
  {
    id: "sugilite",
    name: "スギライト",
    subtitle: "深く沈む絶対の癒し",
    description: "酸いも甘いも噛み分けた、老成した魂の持ち主。並大抵のトラブルには動じず、深く濃い紫色のように、周囲のネガティブな感情を吸収し浄化してくれます。",
    idealParams: { transparency: 10, hardness: 60, refractive: 50, rarity: 80 },
    colorType: "darkpurple",
    hexColor: "#8A2BE2"
  },
  {
    id: "pearl",
    name: "パール",
    subtitle: "異物を包み込む寛容",
    description: "痛みを伴う経験すらも、時間をかけて自分の中で層を重ね、最終的に美しい輝きへと昇華する力を持っています。圧倒的な寛容さと自己成長の象徴です。",
    idealParams: { transparency: 5, hardness: 30, refractive: 30, rarity: 40 },
    colorType: "white",
    hexColor: "#FDF5E6"
  },
  {
    id: "amber",
    name: "アンバー",
    subtitle: "時を封じ込める記憶",
    description: "過去の記憶や経験、思い出をとても大切にします。一見ゆっくりとしていて保守的に見えますが、その中には膨大な知恵と温かい歴史が刻まれています。",
    idealParams: { transparency: 40, hardness: 20, refractive: 40, rarity: 55 },
    colorType: "orange",
    hexColor: "#FFBF00"
  },
  {
    id: "blackopal",
    name: "ブラックオパール",
    subtitle: "深淵に潜む極上の創造",
    description: "他人の理解を一切求めない、我が道を行く孤高の天才肌。漆黒の中で予測不能な色を放つように、あなたの独創性は群を抜いており、常人には計り知れません。",
    idealParams: { transparency: 5, hardness: 60, refractive: 100, rarity: 98 },
    colorType: "black",
    hexColor: "#1A1A1A"
  },
  {
    id: "turquoise",
    name: "ターコイズ",
    subtitle: "自由に旅する守護の空",
    description: "束縛を嫌い、広い世界を自由に旅することを愛します。明るいブルーのようにオープンなあなたの心は、周りの人を惹きつけ、お互いを守り合う強い絆を生み出します。",
    idealParams: { transparency: 0, hardness: 50, refractive: 30, rarity: 30 },
    colorType: "turquoise",
    hexColor: "#40E0D0"
  },
  {
    id: "jadeite",
    name: "翡翠（ジェダイト）",
    subtitle: "静かなる徳と精神の成熟",
    description: "精神的な成長や徳を重んじる、非常に落ち着いた性格です。派手なアピールはしませんが、その内側には東洋の神秘を感じさせる深い知恵と仁徳が備わっています。",
    idealParams: { transparency: 10, hardness: 75, refractive: 20, rarity: 45 },
    colorType: "green",
    hexColor: "#00A86B"
  },
  {
    id: "lapislazuli",
    name: "ラピスラズリ",
    subtitle: "星空を描く群青の真理",
    description: "直感力と洞察力に優れ、物事の真理を見抜こうとする哲学的な頭脳を持っています。目先の利益にとらわれず、高い理想を掲げて進む星空のような存在です。",
    idealParams: { transparency: 0, hardness: 55, refractive: 40, rarity: 55 },
    colorType: "blue",
    hexColor: "#26619C"
  },
  {
    id: "spinel",
    name: "スピネル",
    subtitle: "情熱を貫く自己実現",
    description: "自分軸を強く持ち、他人に流されることなく自己実現に向けて突き進みます。長い間気づかれなかった真価が発揮されたとき、圧倒的な輝きを放つ大器晩成タイプ。",
    idealParams: { transparency: 75, hardness: 80, refractive: 60, rarity: 65 },
    colorType: "red",
    hexColor: "#FF003F"
  },
  {
    id: "morganite",
    name: "モルガナイト",
    subtitle: "清らかなる愛と共感",
    description: "優しさと共感能力に溢れ、周囲の人の心を包み込むような温かいオーラを持っています。ギスギスした場所でも、あなたが居るだけで空気がふんわりと和らぎます。",
    idealParams: { transparency: 85, hardness: 65, refractive: 50, rarity: 50 },
    colorType: "pink",
    hexColor: "#FFC8CB"
  },
  {
    id: "kunzite",
    name: "クンツァイト",
    subtitle: "無防備なほどの純心",
    description: "他人を疑うことを知らない、まっすぐで純粋な心が最大の特徴です。脆く傷つきやすい一面もありますが、その純真さは多くの人の心を洗う力があります。",
    idealParams: { transparency: 70, hardness: 40, refractive: 80, rarity: 60 },
    colorType: "pinkpurple",
    hexColor: "#E0B0FF"
  },
  {
    id: "demantoidgarnet",
    name: "デマントイドガーネット",
    subtitle: "燃え立つ翠緑の閃光",
    description: "ダイヤモンドを超える輝き（分散率）を持つガーネット。一見大人しく見えますが、内に強烈なエネルギーと情熱を秘め、いざという時には抜群の行動力を発揮します。",
    idealParams: { transparency: 60, hardness: 65, refractive: 95, rarity: 90 },
    colorType: "green",
    hexColor: "#00FF00"
  },
  {
    id: "padparadschasapphire",
    name: "パパラチアサファイア",
    subtitle: "奇跡が宿る蓮の花",
    description: "オレンジとピンクが絶妙に混ざり合う、非常に希少なバランス感覚の持ち主。感情と理性のバランスが完璧で、あらゆる状況に調和や奇跡のような解決策をもたらします。",
    idealParams: { transparency: 70, hardness: 90, refractive: 75, rarity: 95 },
    colorType: "orange-pink",
    hexColor: "#FF7E6B"
  },
  {
    id: "imperialtopaz",
    name: "インペリアルトパーズ",
    subtitle: "誇り高き黄金の指針",
    description: "他者に依存せず、自らの力で未来を切り開く強さと誇りを持っています。その揺るぎない自信は周囲を魅了し、リーダーとしての気高さ（インペリアル）を感じさせます。",
    idealParams: { transparency: 85, hardness: 80, refractive: 65, rarity: 85 },
    colorType: "golden",
    hexColor: "#FFA500"
  },
  {
    id: "milkyquartz",
    name: "ミルキークォーツ",
    subtitle: "母性にあふれた乳白色の愛",
    description: "とても優しく、すべてを受け入れる受容性の高さが特徴です。周りの人をほっとさせるような、純粋で温かい包容力を持っています。",
    idealParams: { transparency: 30, hardness: 40, refractive: 50, rarity: 30 },
    colorType: "white",
    hexColor: "#FDFFF4"
  },
  {
    id: "coral",
    name: "さんご（コーラル）",
    subtitle: "命を育む海の生命力",
    description: "生命力に満ち溢れ、守り育てる力が強いタイプです。困難な状況にあっても、じっくりと腰を据えて確かな基盤を築き上げるたくましさがあります。",
    idealParams: { transparency: 0, hardness: 30, refractive: 20, rarity: 40 },
    colorType: "red",
    hexColor: "#FF7F50"
  },
  {
    id: "rhodochrosite",
    name: "インカローズ（ロードクロサイト）",
    subtitle: "バラ色の人生を呼び込む情熱",
    description: "恋愛や自己表現において、華やかで強い情熱を持っています。過去の傷を癒やし、自分を愛し、新しい一歩を踏み出す勇気に満ち溢れています。",
    idealParams: { transparency: 20, hardness: 35, refractive: 50, rarity: 60 },
    colorType: "pink",
    hexColor: "#FC74FD"
  },
  {
    id: "fluorite",
    name: "フローライト",
    subtitle: "天才のひらめきと自由な風",
    description: "固定観念に縛られず、自由におおらかに思考の羽を伸ばします。複数の色が混ざり合う天才の石のように、非常に柔軟で多角的な視点を持っています。",
    idealParams: { transparency: 85, hardness: 30, refractive: 80, rarity: 50 },
    colorType: "multi",
    hexColor: "#66FF66"
  },
  {
    id: "kyanite",
    name: "カイヤナイト",
    subtitle: "道を切り開く自立の青",
    description: "古い考えを断ち切り、まっすぐに自分の信じる道を突き進む意志の強さを持っています。整理整頓が得意で、頭の中が常にクリアな状態を保ちます。",
    idealParams: { transparency: 60, hardness: 50, refractive: 75, rarity: 55 },
    colorType: "blue",
    hexColor: "#054D87"
  },
  {
    id: "malachite",
    name: "マラカイト",
    subtitle: "邪気を祓う孔雀の眼",
    description: "洞察力が非常に鋭く、人の本質や物事の真偽を即座に見抜きます。同時に、他者の痛みを吸収してしまうため、定期的なリセットと癒やしが必要です。",
    idealParams: { transparency: 0, hardness: 30, refractive: 20, rarity: 40 },
    colorType: "green",
    hexColor: "#00FF00"
  },
  {
    id: "chrysoprase",
    name: "クリソプレーズ",
    subtitle: "希望をもたらすアップルグリーン",
    description: "負の感情を鎮め、新しい才能の開花を促す力を持っています。あなたの周りには常に爽やかな風が吹き、落ち込んでいる人を勇気づけます。",
    idealParams: { transparency: 20, hardness: 65, refractive: 50, rarity: 70 },
    colorType: "green",
    hexColor: "#00FF7F"
  },
  {
    id: "onyx",
    name: "オニキス",
    subtitle: "迷いなき漆黒の盾",
    description: "一度決めたことは最後までやり遂げる、強い忍耐力と意志を持っています。外側のネガティブな意見に振り回されない、確固たる自分軸があります。",
    idealParams: { transparency: 0, hardness: 75, refractive: 10, rarity: 40 },
    colorType: "black",
    hexColor: "#000000"
  },
  {
    id: "tourmaline",
    name: "トルマリン",
    subtitle: "相反する力を調和する電気",
    description: "感情の起伏や環境の変化を電気のようにエネルギーへ変換できます。非常に多面的な魅力があり、どんな状況でも自分のプラスに変える力強さがあります。",
    idealParams: { transparency: 50, hardness: 75, refractive: 80, rarity: 60 },
    colorType: "multi",
    hexColor: "#FF69B4"
  },
  {
    id: "obsidian",
    name: "オブシディアン",
    subtitle: "本質を映す真実の鏡",
    description: "見えない本質をパッと見抜く鋭さがあり、物事の白黒をはっきりさせるのが得意。非常に慎重で防御力が高いですが、守る決意をしたときの強さは随一です。",
    idealParams: { transparency: 10, hardness: 60, refractive: 85, rarity: 50 },
    colorType: "black",
    hexColor: "#2F4F4F"
  },
  {
    id: "smokyquartz",
    name: "ブラウンクォーツ（スモーキークォーツ）",
    subtitle: "大地と繋がる安心感",
    description: "非常に現実的で地に足のついた考え方をします。周囲が浮き足立っている時でも、あなただけは冷静に現状を分析し、物事を安定へと導きます。",
    idealParams: { transparency: 40, hardness: 65, refractive: 50, rarity: 40 },
    colorType: "brown",
    hexColor: "#A0522D"
  },
  {
    id: "redberyl",
    name: "レッドベリル",
    subtitle: "深紅に燃える奇跡",
    description: "存在するだけで奇跡とされるほど希少。非常に情熱的でありながら、一切の濁りがない純粋な魂を持っています。普通の人とは違う独特の波長を持っています。",
    idealParams: { transparency: 75, hardness: 75, refractive: 85, rarity: 98 },
    colorType: "red",
    hexColor: "#DC143C"
  },
  {
    id: "chrysocolla",
    name: "クリソコーラ",
    subtitle: "地球を抱く大いなる愛",
    description: "美意識が高く、自然や芸術を深く愛します。コミュニケーション能力に優れ、反発しあうものをまあるく繋ぎ合わせる、ピースメーカーのような存在です。",
    idealParams: { transparency: 0, hardness: 20, refractive: 40, rarity: 65 },
    colorType: "bluegreen",
    hexColor: "#5F9EA0"
  },
  {
    id: "iolite",
    name: "アイオライト",
    subtitle: "嵐を導く羅針盤",
    description: "混乱の中でも決して進むべき道を見失わない、強い直感と冷静な判断力を持っています。他人の意見に惑わされず、自分自身の羅針盤に従います。",
    idealParams: { transparency: 60, hardness: 70, refractive: 85, rarity: 60 },
    colorType: "blue",
    hexColor: "#4B0082"
  },
  {
    id: "nephrite",
    name: "ネフライト",
    subtitle: "安らぎと不屈の哲学",
    description: "強靭な精神力を持ちながらも、決してそれをひけらかしません。静かで深い知恵を持ち、哲学的に物事を考え、周囲に安らぎと平穏をもたらします。",
    idealParams: { transparency: 0, hardness: 60, refractive: 30, rarity: 50 },
    colorType: "green",
    hexColor: "#2E8B57"
  },
  {
    id: "sardonyx",
    name: "サードニクス（サードオニキス）",
    subtitle: "絆を深める夫婦の和",
    description: "人との繋がりや和を何よりも大切にします。チームワークを重んじ、コミュニケーションを円滑にして、人間関係を良好に保つ温かな才能があります。",
    idealParams: { transparency: 30, hardness: 65, refractive: 40, rarity: 40 },
    colorType: "orange",
    hexColor: "#FF4500"
  },
  {
    id: "angelite",
    name: "エンジェライト",
    subtitle: "天使のささやきと許し",
    description: "過去の過ちや他人のミスを水に流せる、深い許しの心を持っています。とても優しく繊細で、スピリチュアルな直感に優れています。",
    idealParams: { transparency: 10, hardness: 30, refractive: 60, rarity: 55 },
    colorType: "lightblue",
    hexColor: "#87CEFA"
  },
  {
    id: "jasper",
    name: "ジャスパー",
    subtitle: "大地に根を張る勇気",
    description: "行動力があり、逆境に立たされても決して諦めません。大地のような安心感があり、周りの人々に勇気と決断力を与えるリーダー気質です。",
    idealParams: { transparency: 0, hardness: 65, refractive: 10, rarity: 40 },
    colorType: "red",
    hexColor: "#B22222"
  },
  {
    id: "charoite",
    name: "チャロアイト",
    subtitle: "恐怖を克服する紫の炎",
    description: "未知への恐怖や不安を乗り越え、新しい一歩を踏み出す勇気に満ちています。霊的な強さと癒やしの力があり、精神的な成長を常に求めています。",
    idealParams: { transparency: 0, hardness: 55, refractive: 40, rarity: 75 },
    colorType: "purple",
    hexColor: "#9370DB"
  },
  {
    id: "granite",
    name: "グラナイト",
    subtitle: "揺るぎない絶対の基盤",
    description: "何事にも動じない圧倒的な安定感があり、非常に堅実です。華やかさよりも実用性と信頼を重んじ、誰かにとっての絶対的な支えとなります。",
    idealParams: { transparency: 0, hardness: 80, refractive: 10, rarity: 20 },
    colorType: "grey",
    hexColor: "#808080"
  },
  {
    id: "larimar",
    name: "ラリマー",
    subtitle: "愛と平和を歌う海",
    description: "争いごとを何よりも嫌い、どこまでも平和主義です。カリブ海のような明るさと無邪気さで、周囲のネガティブな感情を洗い流してくれます。",
    idealParams: { transparency: 10, hardness: 45, refractive: 50, rarity: 75 },
    colorType: "blue",
    hexColor: "#00CED1"
  },
  {
    id: "crystal",
    name: "クリスタル（水晶）",
    subtitle: "すべてを増幅する純粋無垢",
    description: "クセがなく、誰とでもどんな環境でも合わせられる純粋な万能タイプ。自分自身が透明だからこそ、相手の良さを何倍にも引き出すことができます。",
    idealParams: { transparency: 100, hardness: 70, refractive: 60, rarity: 20 },
    colorType: "white",
    hexColor: "#FFFFFF"
  },
  {
    id: "apatite",
    name: "アパタイト",
    subtitle: "真実を繋ぐ絆の引力",
    description: "バラバラになったものを結びつける力に優れ、組織やグループの中心で潤滑油になります。真実を見極める目と、人を惹きつける不思議な引力を持ちます。",
    idealParams: { transparency: 50, hardness: 50, refractive: 65, rarity: 50 },
    colorType: "blue",
    hexColor: "#00BFFF"
  },
  {
    id: "amazonite",
    name: "アマゾナイト",
    subtitle: "希望へ導く清らかな流れ",
    description: "「ホープストーン」と呼ばれる通り、常に前向きで希望を忘れません。思考と感情のバランスを取るのが上手く、ストレスにも強い柔軟な心を持っています。",
    idealParams: { transparency: 10, hardness: 60, refractive: 40, rarity: 40 },
    colorType: "cyan",
    hexColor: "#3CB371"
  },
  {
    id: "carnelian",
    name: "カーネリアン",
    subtitle: "力強く脈打つ生命の炎",
    description: "好奇心とチャレンジ精神に溢れ、新しいことへ飛び込む勇気を持っています。行動することで道を開き、周囲にも活力を与えるエネルギッシュな人物です。",
    idealParams: { transparency: 30, hardness: 65, refractive: 30, rarity: 30 },
    colorType: "orange",
    hexColor: "#FF6347"
  },
  {
    id: "zircon",
    name: "ジルコン",
    subtitle: "光を分散する最古の知恵",
    description: "地球最古の鉱物と言われるように、非常に古い魂や成熟した思考を持っています。物事を驚くほど多角的に分析し（高分散）、真理へと到達します。",
    idealParams: { transparency: 75, hardness: 75, refractive: 95, rarity: 60 },
    colorType: "clear",
    hexColor: "#E0FFFF"
  },
  {
    id: "strawberryquartz",
    name: "ストロベリークォーツ",
    subtitle: "内包された華やかな喜び",
    description: "日常の小さな喜びを見つけるのが天才的に上手です。内側にたくさんのキラキラした楽しい感情を秘めており、人生を心から楽しもうとする姿勢を持っています。",
    idealParams: { transparency: 60, hardness: 70, refractive: 55, rarity: 70 },
    colorType: "pink",
    hexColor: "#FF627C"
  },
  {
    id: "herkimerdiamond",
    name: "ハーキマークォーツ",
    subtitle: "夢を具現化する透明な種",
    description: "想像力や夢想する力が非常に強く、それを現実世界に引っ張ってくる強烈な直感を持っています。生まれながらに完成された、無垢で強力なエネルギーの持ち主です。",
    idealParams: { transparency: 95, hardness: 75, refractive: 75, rarity: 80 },
    colorType: "white",
    hexColor: "#F8F8FF"
  },
  {
    id: "prehnite",
    name: "プレナイト",
    subtitle: "不必要なものを手放す緑",
    description: "自分にとって不要なもの、人にどう思われるかといった執着をあっさりと手放せます。常に自然体で、自分が本当に心地よいと思う道だけを選び取ります。",
    idealParams: { transparency: 50, hardness: 60, refractive: 50, rarity: 50 },
    colorType: "green",
    hexColor: "#98FB98"
  },
  {
    id: "rutilequartz",
    name: "ルチルクォーツ",
    subtitle: "直感を束ねる黄金の針",
    description: "アンテナのように鋭い直感力を持ち、チャンスを逃さず掴み取る勝負強さがあります。内側に強い意志の光（針）を持っており、カリスマ性を秘めています。",
    idealParams: { transparency: 70, hardness: 70, refractive: 80, rarity: 65 },
    colorType: "gold",
    hexColor: "#FFD700"
  },
  {
    id: "hauyne",
    name: "アウイナイト",
    subtitle: "過去を癒やす奇跡の青",
    description: "目が覚めるようなネオンブルーのように、他人の心に強烈な印象を残します。新しい環境への適応力が高く、全く新しい価値観をチームにもたらす超希少な存在。",
    idealParams: { transparency: 60, hardness: 55, refractive: 60, rarity: 95 },
    colorType: "blue",
    hexColor: "#0A46F0"
  },
  {
    id: "ametrine",
    name: "アメトリン",
    subtitle: "思考と感情の黄金比",
    description: "アメジストの冷静さと、シトリンの陽気さを併せ持つ奇跡のバランス型。自分の中に相反する２つの顔があり、状況に応じてそれを使い分ける器用さがあります。",
    idealParams: { transparency: 70, hardness: 70, refractive: 85, rarity: 85 },
    colorType: "purple-yellow",
    hexColor: "#C761D6"
  },
  {
    id: "agate",
    name: "アゲート",
    subtitle: "微小な結晶が織りなす絆",
    description: "見えないところでたくさんの経験や努力が層になっており、非常にタフで経験豊富。どんな困難にも動じず、周囲に深い安心感を与える精神的な支柱です。",
    idealParams: { transparency: 10, hardness: 65, refractive: 30, rarity: 30 },
    colorType: "multi",
    hexColor: "#C19A6B"
  },
  {
    id: "grandidierite",
    name: "グランディディエライト",
    subtitle: "奇跡を越えるブルーグリーン",
    description: "世界で最も希少な宝石の一つと言われるほど、類まれな才能や存在感を持っています。奇跡のような確率でしか出会えない、唯一無二の魅力です。",
    idealParams: { transparency: 80, hardness: 75, refractive: 65, rarity: 100 },
    colorType: "bluegreen",
    hexColor: "#61878E"
  },
  {
    id: "hematite",
    name: "ヘマタイト",
    subtitle: "勝利へ導く重厚なる戦士",
    description: "強い精神力と、困難を跳ね返す圧倒的な防御力を持っています。地に足をつけ（グラウンディング）、確実に勝利や成果を掴み取る武骨な戦士です。",
    idealParams: { transparency: 0, hardness: 65, refractive: 30, rarity: 30 },
    colorType: "grey",
    hexColor: "#4A4D4E"
  },
  {
    id: "orangecitrine",
    name: "オレンジシトリン",
    subtitle: "豊穣の果実と陽だまり",
    description: "通常のシトリンよりもさらに深く豊かな活力を持ち、人生を楽しむためのポジティブなエネルギーに溢れています。周りにも笑顔と豊かさを分け与えます。",
    idealParams: { transparency: 80, hardness: 65, refractive: 75, rarity: 50 },
    colorType: "orange",
    hexColor: "#E28B00"
  },
  {
    id: "catseye",
    name: "キャッツアイ（クリソベリル）",
    subtitle: "暗闇を見通す第三の目",
    description: "直感が非常に鋭く、危険や悪意を事前に察知して回避する能力に長けています。鋭い一条の光のように、ブレない自分の軸を持っています。",
    idealParams: { transparency: 20, hardness: 85, refractive: 90, rarity: 75 },
    colorType: "yellowgreen",
    hexColor: "#9B9B00"
  },
  {
    id: "sunstone",
    name: "サンストーン",
    subtitle: "自信が輝く勝利の太陽",
    description: "内に秘めたコンプレックスを燃やし尽くし、絶対的な自信へと変える力があります。まるで太陽のように、自ら熱を発して周囲を温かく照らします。",
    idealParams: { transparency: 40, hardness: 60, refractive: 80, rarity: 60 },
    colorType: "orange",
    hexColor: "#FF7034"
  },
  {
    id: "selenite",
    name: "セレナイト",
    subtitle: "天使が落とした浄化の羽根",
    description: "高い精神性と、周りの空間すらも浄化してしまうほどの透き通った心の持ち主です。少し傷つきやすいですが、その繊細さが大いなる癒やしを生みます。",
    idealParams: { transparency: 60, hardness: 20, refractive: 40, rarity: 40 },
    colorType: "white",
    hexColor: "#ECEFF1"
  },
  {
    id: "sodalite",
    name: "ソーダライト",
    subtitle: "知性と理性の深い海",
    description: "感情の波に飲み込まれることなく、常に論理的で冷静な判断ができます。「恐怖」や「迷い」を払いのけ、正しい決断を下すことができる知性の塊です。",
    idealParams: { transparency: 10, hardness: 55, refractive: 40, rarity: 45 },
    colorType: "blue",
    hexColor: "#1560BD"
  },
  {
    id: "zoisite",
    name: "ゾイサイト",
    subtitle: "再生を告げる生命の息吹",
    description: "何度も生まれ変わるような、強烈な生命力と再生力を持っています。困難に直面しても、それを成長の糧にしてポジティブに飛び越えていけます。",
    idealParams: { transparency: 30, hardness: 65, refractive: 60, rarity: 60 },
    colorType: "green",
    hexColor: "#8EE53F"
  },
  {
    id: "taaffeite",
    name: "ターフェアイト",
    subtitle: "偶然が重なる奇跡の発見",
    description: "スピネルとして発見された後に別の新種と判明した歴史のように、あなたの才能は思わぬところから開花します。世界有数の希少価値を持つ運命の塊です。",
    idealParams: { transparency: 90, hardness: 80, refractive: 85, rarity: 100 },
    colorType: "pinkpurple",
    hexColor: "#C9A0DC"
  },
  {
    id: "diaspore",
    name: "ダイアスポア（ズルタナイト）",
    subtitle: "光に揺らぐ万華鏡",
    description: "光の種類によって色を変える、非常に柔軟性の高い適応力の持ち主です。どんな環境に置かれても、その場に合った最高の自分を演出し輝くことができます。",
    idealParams: { transparency: 60, hardness: 65, refractive: 95, rarity: 90 },
    colorType: "multi",
    hexColor: "#C2B280"
  },
  {
    id: "richterite",
    name: "リヒテライト",
    subtitle: "円滑なる水脈の調和",
    description: "複雑に絡み合った人間関係や問題を、流れる水のように円滑に解きほぐす力があります。強い自己主張はしませんが、組織にとって欠かせない潤滑油です。",
    idealParams: { transparency: 20, hardness: 55, refractive: 60, rarity: 85 },
    colorType: "blue",
    hexColor: "#71A6D2"
  },
  {
    id: "moldavite",
    name: "モルダバイト",
    subtitle: "宇宙から飛来した覚醒の緑",
    description: "非常に高い次元の視点を持ち、時には常識を覆すほどの変革をもたらします。宇宙と地球を繋ぐ隕石のように、全く新しいインスピレーションを生み出します。",
    idealParams: { transparency: 70, hardness: 55, refractive: 80, rarity: 85 },
    colorType: "green",
    hexColor: "#4B5320"
  },
  {
    id: "morion",
    name: "モリオン（黒水晶）",
    subtitle: "絶対的な魔除けの黒",
    description: "どんなネガティブな感情や悪意も跳ね返す、最強の防御力を持っています。非常に堅実でブレない芯があり、周りの人々に絶対的な安心感を与えます。",
    idealParams: { transparency: 0, hardness: 75, refractive: 20, rarity: 65 },
    colorType: "black",
    hexColor: "#1A1A1A"
  },
  {
    id: "heliodor",
    name: "ヘリオドール",
    subtitle: "希望を照らす太陽の贈り物",
    description: "内側からあふれるような活力と輝きを持っています。どんな暗闇の中でも希望の光を見出し、周囲を明るく照らして引っ張っていく力強さがあります。",
    idealParams: { transparency: 85, hardness: 75, refractive: 70, rarity: 60 },
    colorType: "yellow",
    hexColor: "#FFD700"
  },
  {
    id: "petalite",
    name: "ペタライト",
    subtitle: "天使の羽根の如き純白",
    description: "「天使の石」と呼ばれるほど、高く純粋な波動を持っています。争いを好まず、すべてを包み込むような優しさと、天性のヒーリング能力を秘めています。",
    idealParams: { transparency: 90, hardness: 60, refractive: 65, rarity: 75 },
    colorType: "white",
    hexColor: "#F5F5F5"
  },
  {
    id: "feldspar",
    name: "フェルスパー（長石）",
    subtitle: "多様性を内包する大地の母",
    description: "地球上で最も多く存在する鉱物グループのように、どんな環境にも適応し、多様な才能を発揮します。派手さより堅実さと包容力を重んじる性格です。",
    idealParams: { transparency: 30, hardness: 60, refractive: 50, rarity: 30 },
    colorType: "multi",
    hexColor: "#D2B48C"
  },
  {
    id: "pinksapphire",
    name: "ピンクサファイア",
    subtitle: "愛を貫く不屈のロマンチスト",
    description: "愛らしさと華やかさを持ちながら、サファイア特有の非常に強い芯（硬度）を持っています。自分の信じる「愛」や「好き」を絶対に曲げない強さがあります。",
    idealParams: { transparency: 75, hardness: 95, refractive: 60, rarity: 80 },
    colorType: "pink",
    hexColor: "#FF69B4"
  },
  {
    id: "hiddenite",
    name: "ヒデナイト",
    subtitle: "静界に潜む癒やしの深緑",
    description: "自分から前に出ることは少ないですが、深い思いやりと癒やしの力を持っています。控えめながらも知性に溢れ、人知れず他者をサポートする才能があります。",
    idealParams: { transparency: 80, hardness: 65, refractive: 70, rarity: 85 },
    colorType: "green",
    hexColor: "#8FBC8F"
  },
  {
    id: "triplite",
    name: "トリプライト",
    subtitle: "三つの力を持つ奇跡の発掘",
    description: "非常に珍しく、見つけるのが困難な「幻の石」。あなたの中にはまだ誰も気づいていない（もしかすると自分でも気づいていない）莫大なポテンシャルが眠っています。",
    idealParams: { transparency: 40, hardness: 50, refractive: 80, rarity: 95 },
    colorType: "brownred",
    hexColor: "#8B4513"
  },
  {
    id: "pinkdiamond",
    name: "ピンクダイヤモンド",
    subtitle: "神が授けし奇跡の華",
    description: "ダイヤモンドの圧倒的な強さと、世界中に熱狂をもたらす最高峰の希少性をあわせ持つ完璧な存在。誇り高く、かつ息をのむほど美しく周囲を魅了し進む圧倒的な主役タイプです。",
    idealParams: { transparency: 100, hardness: 100, refractive: 95, rarity: 100 },
    colorType: "pink",
    hexColor: "#FFB7C5"
  },
  {
    id: "coal",
    name: "コール（石炭）",
    subtitle: "静かに燃えあがる無限の熱源",
    description: "外見は無骨ですが、内側には強烈なエネルギーとポテンシャルを秘めています。どんな逆境でも燃え上がり、周囲を力強く温める熱い心を持っています。",
    idealParams: { transparency: 0, hardness: 20, refractive: 10, rarity: 10 },
    colorType: "black",
    hexColor: "#2C2C2C"
  },
  {
    id: "blueapatite",
    name: "ブルーアパタイト",
    subtitle: "迷いを打ち砕く真実の青",
    description: "自己主張をしっかり持ち、コミュニケーションを通じて周囲の迷いを晴らす強さがあります。自己を表現する力に優れ、人を正しい道に導く力を持っています。",
    idealParams: { transparency: 50, hardness: 50, refractive: 65, rarity: 50 },
    colorType: "blue",
    hexColor: "#007BA7"
  },
  {
    id: "watermelontourmaline",
    name: "ウォーターメロントルマリン",
    subtitle: "二面性を楽しむスイカの笑顔",
    description: "赤と緑の全く違う色が共存するように、相反する二つの才能や感情を自分の中で完璧に統合させています。陽気で個性的な魅力が人を惹きつけます。",
    idealParams: { transparency: 60, hardness: 75, refractive: 80, rarity: 75 },
    colorType: "multi",
    hexColor: "#FF6B8B"
  },
  {
    id: "rhodolitegarnet",
    name: "ロードライトガーネット",
    subtitle: "バラのように芳醇な実りの光",
    description: "努力を惜しまず、着実に豊かな成果を引き寄せる力があります。華やかさと深い落ち着きを併せ持ち、実りある人生を自らの手で切り開くタイプです。",
    idealParams: { transparency: 65, hardness: 75, refractive: 80, rarity: 60 },
    colorType: "pinkpurple",
    hexColor: "#C34A7B"
  },
  {
    id: "cherryquartz",
    name: "チェリークォーツ",
    subtitle: "好奇心弾けるサクラ色の果実",
    description: "明るく元気で、いつも前向きなエネルギーを発散しています。新しいことへの好奇心が旺盛で、みんなを笑顔にさせるムードメーカーです。",
    idealParams: { transparency: 50, hardness: 65, refractive: 55, rarity: 40 },
    colorType: "pink",
    hexColor: "#FFB0C2"
  },
  {
    id: "moissanite",
    name: "モアサナイト",
    subtitle: "星から舞い降りた不屈の輝き",
    description: "ダイヤモンドをも凌ぐ輝きを放ちながら、困難に対して決して折れない強さを持っています。宇宙由来の隕石の如く、常識にとらわれないスケール感の持ち主です。",
    idealParams: { transparency: 95, hardness: 95, refractive: 100, rarity: 80 },
    colorType: "white",
    hexColor: "#F5FFFA"
  },
  {
    id: "lepidolite",
    name: "レピドライト",
    subtitle: "変革を受け入れる紫の鱗",
    description: "人生の転換期を恐れず、むしろ変化の波を乗りこなす柔軟性を持っています。深い精神性とリラックス効果で、周囲のストレスを和らげる存在です。",
    idealParams: { transparency: 20, hardness: 30, refractive: 40, rarity: 45 },
    colorType: "purple",
    hexColor: "#D8BFD8"
  },
  {
    id: "orthoclase",
    name: "オーソクレース",
    subtitle: "目標を定めるブレない意志",
    description: "直角に割れる性質のように、物事に対して道筋を立て、まっすぐに目標へ進む論理的な思考を持っています。冷静な判断で組織を支えます。",
    idealParams: { transparency: 40, hardness: 60, refractive: 50, rarity: 50 },
    colorType: "yellow",
    hexColor: "#FFFACD"
  },
  {
    id: "pyrite",
    name: "パイライト",
    subtitle: "火花を散らす黄金の盾",
    description: "叩けば火花を散らす石のように、困難にぶつかるほど強いエネルギーを発揮します。圧倒的な行動力と意志の強さで、道を塞ぐあらゆる壁を打ち砕きます。",
    idealParams: { transparency: 0, hardness: 60, refractive: 10, rarity: 40 },
    colorType: "gold",
    hexColor: "#D4AF37"
  },
  {
    id: "howlite",
    name: "ハウライト",
    subtitle: "怒りを鎮める純白の大自然",
    description: "清らかな白い姿のように、燃え上がる感情や怒りを鎮め、深い静寂に導く力があります。客観的な視野から物事を見つめ、正しい選択をする知性派です。",
    idealParams: { transparency: 0, hardness: 35, refractive: 20, rarity: 30 },
    colorType: "white",
    hexColor: "#ECECEC"
  },
  {
    id: "hackmanite",
    name: "ハックマナイト",
    subtitle: "光で記憶を刻む変化の紫",
    description: "紫外線を浴びると色を変え、時間が経つとまた戻るという不思議な力を持っています。その場の空気に合わせて自分を変化させ、多様な経験を吸収する柔軟性があります。",
    idealParams: { transparency: 30, hardness: 55, refractive: 45, rarity: 85 },
    colorType: "purple",
    hexColor: "#B5A6E8"
  },
  {
    id: "barite",
    name: "バライト",
    subtitle: "大地と深く繋がる重力薔薇",
    description: "比重が重く、「砂漠の薔薇」ともなる石。物事の本質を重く受け止め、しっかりと地に足をつけて人生を歩む重厚な安定感を持っています。",
    idealParams: { transparency: 50, hardness: 30, refractive: 60, rarity: 50 },
    colorType: "clear",
    hexColor: "#F5F5DC"
  },
  {
    id: "variscite",
    name: "バリサイト",
    subtitle: "希望を育む陽気な緑",
    description: "豊かな感受性と自己表現力に優れ、人を励まし希望を与えるのが得意です。恐れを手放し、自信を持って前に進むポジティブなエネルギーに満ちています。",
    idealParams: { transparency: 10, hardness: 45, refractive: 30, rarity: 60 },
    colorType: "green",
    hexColor: "#3CB371"
  },
  {
    id: "pinkimperialtopaz",
    name: "ピンクインペリアルトパーズ",
    subtitle: "愛と誇りを導く帝王のピンク",
    description: "インペリアルトパーズの中でも特に稀少。揺るぎない自信と誇りに加え、限りなく優しく深い愛を持っています。他者の模範となるような王の気品を備えています。",
    idealParams: { transparency: 85, hardness: 80, refractive: 75, rarity: 95 },
    colorType: "pink",
    hexColor: "#FF6EB4"
  },
  {
    id: "pezzottaite",
    name: "ペツォッタイト",
    subtitle: "甘く輝くラズベリーの微笑",
    description: "見ているだけで元気が出るような、明るくフルーティーな魅力を持っています。一度見たら忘れられないほどの個性派で、多くの人を惹きつける存在です。",
    idealParams: { transparency: 70, hardness: 80, refractive: 60, rarity: 90 },
    colorType: "pink",
    hexColor: "#D63473"
  },
  {
    id: "poudretteite",
    name: "ポードレッタイト",
    subtitle: "世界を驚嘆させる極希少の桜",
    description: "世界で最も希少と言っても過言ではないほどの幻の存在。誰もが認める圧倒なポテンシャルを持ちながらも、儚く美しい桜のような品格を持っています。",
    idealParams: { transparency: 90, hardness: 65, refractive: 75, rarity: 100 },
    colorType: "pink",
    hexColor: "#FFB7C5"
  },
  {
    id: "yooperlite",
    name: "ユーパーライト",
    subtitle: "秘めた光を放つ魔法の石",
    description: "一見ただの石に見えますが、紫外線を当てると燃えるように光り輝きます。普段は実力を隠していますが、いざという時に誰も予想しなかった大活躍を見せるタイプです。",
    idealParams: { transparency: 0, hardness: 55, refractive: 10, rarity: 75 },
    colorType: "grey",
    hexColor: "#808080"
  },
  {
    id: "rhodonite",
    name: "ロードナイト",
    subtitle: "行動へ移す友愛の薔薇",
    description: "胸に秘めた愛を行動として現実世界に表していく力があります。友人や家族に対して非常に愛情深く、実務的なサポートや細やかな気配りがとても得意です。",
    idealParams: { transparency: 10, hardness: 60, refractive: 40, rarity: 50 },
    colorType: "red",
    hexColor: "#CC6883"
  },
  {
    id: "smithsonite",
    name: "スミソナイト",
    subtitle: "不安を洗い流すパステル",
    description: "優しい色合いで、怖れや心の傷を優しく包み込みます。穏やかなコミュニケーションを大切にし、周りの人がふと弱音を吐けるような安心感を与えます。",
    idealParams: { transparency: 20, hardness: 45, refractive: 50, rarity: 70 },
    colorType: "cyan",
    hexColor: "#40E0D0"
  },
  {
    id: "starsapphire",
    name: "スターサファイア",
    subtitle: "運命を導く三筋の光",
    description: "冷静さと知性を極め、そこに「信仰・希望・運命」の光を宿しています。困難な状況でも、目指すべき一点の輝きを見つけ出し、周囲を希望へ導く真のリーダーです。",
    idealParams: { transparency: 30, hardness: 90, refractive: 60, rarity: 85 },
    colorType: "blue",
    hexColor: "#2A52BE"
  },
  {
    id: "scapolite",
    name: "スキャポライト",
    subtitle: "依存から抜け出す柱の支え",
    description: "自立心を促し、古い習慣や依存から脱却するための強い精神的支えとなります。物事を整理して計画的に進める実務能力の高さが特徴です。",
    idealParams: { transparency: 50, hardness: 60, refractive: 55, rarity: 65 },
    colorType: "purple",
    hexColor: "#DDA0DD"
  },
  {
    id: "piemontite",
    name: "ピーモンタイト",
    subtitle: "血潮のように力強い情の赤",
    description: "紅簾石（こうれんせき）の名にふさわしく、非常に強い情と深い愛情の持ち主です。困難な状況においても、人との絆や底力でエネルギッシュに乗り越えていきます。",
    idealParams: { transparency: 10, hardness: 65, refractive: 30, rarity: 70 },
    colorType: "darkred",
    hexColor: "#A52A2A"
  },
  {
    id: "beryl",
    name: "ベリル",
    subtitle: "純粋無垢な海と森のきらめき",
    description: "アクアマリンやエメラルドの基本となる鉱物です。飾らない純粋な心を持ち、周囲の環境に自然と馴染むことができます。透明な優しさの持ち主です。",
    idealParams: { transparency: 85, hardness: 75, refractive: 65, rarity: 50 },
    colorType: "green",
    hexColor: "#99cc99"
  },
  {
    id: "phosphophyllite",
    name: "フォスフォフィライト",
    subtitle: "儚くも美しい薄荷の輝き",
    description: "脆く壊れやすい性質と引き換えに、息を呑むような美しさを放ちます。非常に繊細なアンテナと高い芸術的センスを持ち、一部の熱狂的なファンを惹きつけます。",
    idealParams: { transparency: 75, hardness: 15, refractive: 80, rarity: 95 },
    colorType: "cyan",
    hexColor: "#ABDFE0"
  },
  {
    id: "sakuraagate",
    name: "サクラアゲート",
    subtitle: "石に咲き誇る永遠の春",
    description: "内側に桜の花びらのような模様を宿した、心安らぐ石です。どんな環境でも自分のペースを守り、優しく花を咲かせるような大らかな受容力を持っています。",
    idealParams: { transparency: 30, hardness: 65, refractive: 30, rarity: 60 },
    colorType: "pink",
    hexColor: "#F4BABA"
  },
  {
    id: "okenite",
    name: "オケナイト",
    subtitle: "心を撫でる純白のうさぎ",
    description: "石でありながらウサギの尻尾のようなふわふわの針状結晶を持つ不思議な存在。人を無条件で癒すオーラを放ち、争いを好まない究極の平和主義者です。",
    idealParams: { transparency: 0, hardness: 10, refractive: 10, rarity: 75 },
    colorType: "white",
    hexColor: "#F8F8FF"
  },
  {
    id: "rainbowmoonstone",
    name: "レインボームーンストーン",
    subtitle: "夜空に浮かぶ七色の導き",
    description: "白い光の奥に七色の輝き（シラー）を秘めています。直感力とインスピレーションが高く、迷いの中でふと正しい道を見つけ出す不思議な力を持っています。",
    idealParams: { transparency: 60, hardness: 60, refractive: 75, rarity: 65 },
    colorType: "clear",
    hexColor: "#E0FFFF"
  },
  {
    id: "fireopal",
    name: "ファイアオパール",
    subtitle: "情熱を燃やす炎の滴",
    description: "内側からメラメラと燃えるような強い輝きを放ちます。感情豊かで情熱的、一度火がつくととことん突き進む圧倒的な行動力の持ち主です。",
    idealParams: { transparency: 50, hardness: 55, refractive: 80, rarity: 80 },
    colorType: "orange",
    hexColor: "#FF7F00"
  },
  {
    id: "indigolite",
    name: "インディゴライト",
    subtitle: "深海のような蒼き知性",
    description: "ブルートルマリンの一種で、蒼く深い色合いが特徴です。物事を論理的かつ冷静に分析し、表面的なことに惑わされず真実を見抜く深い知性の持ち主です。",
    idealParams: { transparency: 75, hardness: 75, refractive: 70, rarity: 85 },
    colorType: "blue",
    hexColor: "#004B87"
  },
  {
    id: "lemonquartz",
    name: "レモンクォーツ",
    subtitle: "心身を清める弾ける果実",
    description: "爽やかなレモンカラーが、心と体の疲れを優しく解きほぐします。常にフレッシュな視点を持ち、周囲に爽やかな風を吹き込むムードメーカーです。",
    idealParams: { transparency: 85, hardness: 70, refractive: 65, rarity: 40 },
    colorType: "yellow",
    hexColor: "#FFFACD"
  },
  {
    id: "tsavorite",
    name: "ツァボライト",
    subtitle: "溢れる生命の鮮緑",
    description: "生き生きとした鮮烈な緑色が特徴的なガーネット。活力と生命力に満ち溢れ、常に前向きなエネルギーで新しい挑戦を恐れずに楽しむタイプです。",
    idealParams: { transparency: 80, hardness: 75, refractive: 80, rarity: 80 },
    colorType: "green",
    hexColor: "#228B22"
  },
  {
    id: "goshenite",
    name: "ゴシェナイト",
    subtitle: "無色透明な究極のクリア",
    description: "一切の色を持たない純粋なベリル。先入観や偏見がなく、あらゆる物事をありのままに受け入れるフラットで澄み切った心を持っています。",
    idealParams: { transparency: 95, hardness: 75, refractive: 60, rarity: 65 },
    colorType: "clear",
    hexColor: "#FFFFFF"
  },
  {
    id: "blackdiamond",
    name: "ブラックダイヤモンド",
    subtitle: "絶対的な強さを誇る漆黒",
    description: "光を全て吸収する黒いダイヤモンド。他人の意見に流されない絶対的な芯の強さと、圧倒的な威厳でカリスマ的なリーダーシップを発揮します。",
    idealParams: { transparency: 5, hardness: 100, refractive: 20, rarity: 90 },
    colorType: "black",
    hexColor: "#111111"
  },
  {
    id: "musgravite",
    name: "マスグラバイト",
    subtitle: "世界を揺るがす紫の奇跡",
    description: "ターフェアイトと並び称される世界有数の超希少石。ミステリアスな雰囲気を纏い、常人には思いつかないような特異な才能を秘めた天才肌です。",
    idealParams: { transparency: 85, hardness: 80, refractive: 75, rarity: 100 },
    colorType: "purple",
    hexColor: "#665D69"
  },
  {
    id: "candyfluorite",
    name: "キャンディーフローライト",
    subtitle: "発想が踊る魔法の縞模様",
    description: "紫、緑、ピンクなどが入り混じる天才の石。型にはまらない自由な発想力で、次々と面白いアイデアを生み出すクリエイティブな才能に溢れています。",
    idealParams: { transparency: 65, hardness: 40, refractive: 50, rarity: 50 },
    colorType: "multi",
    hexColor: "#DDA0DD"
  },
  {
    id: "azurite",
    name: "アズライト",
    subtitle: "宇宙の理を覗く真実の青",
    description: "第三の目を活性化させると言われる神秘の石。深い洞察力と直感を備え、物事の根本や本質、隠された真実を瞬時に見抜く凄まじい眼力を持っています。",
    idealParams: { transparency: 10, hardness: 35, refractive: 30, rarity: 60 },
    colorType: "blue",
    hexColor: "#003399"
  },
  {
    id: "jeremejevite",
    name: "ジェレメジェバイト（エレメーエファイト）",
    subtitle: "気高き氷の王の微笑み",
    description: "世界中のコレクターが血眼になって探す幻の石。クールで近寄りがたい雰囲気を持ちながらも、内面には澄み切った純粋で美しい精神を宿しています。",
    idealParams: { transparency: 90, hardness: 75, refractive: 65, rarity: 100 },
    colorType: "blue",
    hexColor: "#A9C9DD"
  },
  {
    id: "cubiczirconia",
    name: "キュービックジルコニア",
    subtitle: "自ら価値を創造する努力",
    description: "生まれ持った才能に頼るのではなく、後天的な努力と研鑽によって自らを磨き上げました。「本物」かどうかなど関係なく、あなたの努力こそが最高の価値なのです。",
    idealParams: { transparency: 95, hardness: 80, refractive: 90, rarity: 10 },
    colorType: "clear",
    hexColor: "#FFFFFF"
  },
  {
    id: "tantalite",
    name: "タンタライト",
    subtitle: "大地に根を下ろす黒鉄",
    description: "ずっしりとした重みを持つ黒い鉱物。どんな困難や逆風にも負けず、地に足を着けて確実に一歩ずつ前進する、極めて現実的で忍耐強い性格です。",
    idealParams: { transparency: 5, hardness: 65, refractive: 20, rarity: 80 },
    colorType: "black",
    hexColor: "#222222"
  },
  {
    id: "tigerseye",
    name: "タイガーアイ",
    subtitle: "未来を見通す虎の眼",
    description: "光の筋が虎の目を感じさせる石。シャープな洞察力と決断力を持ち、ビジネスや勝負事でここぞというチャンスを絶対に逃さない勝負強さがあります。",
    idealParams: { transparency: 10, hardness: 70, refractive: 40, rarity: 20 },
    colorType: "brown",
    hexColor: "#A0522D"
  },
  {
    id: "staurolite",
    name: "スタウロライト",
    subtitle: "交差する運命の十字星",
    description: "自然が作り出した十字架の形をした神秘的な石（十字石）。強い信念と信仰心を持ち、異なる価値観を交差させて新しいものを生み出す力があります。",
    idealParams: { transparency: 5, hardness: 75, refractive: 15, rarity: 75 },
    colorType: "brownred",
    hexColor: "#8B4513"
  },
  {
    id: "chrysoberyl",
    name: "クリソベリル",
    subtitle: "凛と輝く黄金の気品",
    description: "希少なアレキサンドライトやキャッツアイの基本となる高貴な石。洗練された知性と品格を兼ね備え、周囲を静かに導くような落ち着いたリーダーシップを持ちます。",
    idealParams: { transparency: 85, hardness: 85, refractive: 75, rarity: 65 },
    colorType: "yellowgreen",
    hexColor: "#BDB76B"
  }
];
