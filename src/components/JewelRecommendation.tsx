import { useEffect, useState } from 'react';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface RakutenItem {
  itemName: string;
  itemUrl: string;
  itemPrice: number;
  mediumImageUrls: { imageUrl: string }[];
}

interface JewelRecommendationProps {
  jewelName: string;
}

export default function JewelRecommendation({ jewelName }: JewelRecommendationProps) {
  const [items, setItems] = useState<RakutenItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const appId = "1055088369869282145";
        const affiliateId = "3d94ea21.0d257908.3d94ea22.0ed11c6e";
        
        // "(〜)" などの補足表記を消して検索精度を上げる（例：モリオン（黒水晶） -> モリオン）
        const pureName = jewelName.split('（')[0].split('(')[0].trim();
        // まずは「ジュエリー」をつけて検索し、アクセサリー類を優先する
        let searchKeyword = pureName + " ジュエリー";
        let res = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=${encodeURIComponent(searchKeyword)}&hits=3&format=json&sort=standard`);
        let data = await res.json();
        
        // ジュエリーでヒットしなかった場合、石の直名だけで広く探す（ルースや原石など）
        if (!data.Items || data.Items.length === 0) {
          searchKeyword = pureName; 
          await new Promise(resolve => setTimeout(resolve, 500)); // APIレートリミット対策
          res = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=${encodeURIComponent(searchKeyword)}&hits=3&format=json&sort=standard`);
          data = await res.json();
        }

        // それでもヒットしなかった場合、装飾語を消して再検索（例: キャンディーフローライト -> フローライト）
        if (!data.Items || data.Items.length === 0) {
          const simplifiedName = pureName.replace(/(キャンディー|スター|レインボー|ウォーターメロン|インペリアル|パライバ|バイカラー|ブラック|ロンドン)/g, "");
          if (simplifiedName !== pureName && simplifiedName.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 500)); // APIレートリミット対策
            res = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=${appId}&keyword=${encodeURIComponent(simplifiedName + " ジュエリー")}&hits=3&format=json&sort=standard`);
            data = await res.json();
          }
        }
        
        if (data.Items) {
          const fetchedItems = data.Items.map((i: any) => {
            const item = i.Item;
            // アフィリエイトリンクの構築
            const affiliateLink = `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(item.itemUrl.split('?')[0])}`;
            return {
              itemName: item.itemName,
              itemUrl: affiliateLink,
              itemPrice: item.itemPrice,
              mediumImageUrls: item.mediumImageUrls
            };
          });
          setItems(fetchedItems);
        }
      } catch (e) {
        console.error("Rakuten API Error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [jewelName]);

  if (loading || items.length === 0) return null;

  return (
    <div className="mt-12 p-6 rounded-2xl border border-slate-800 bg-slate-900/30">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5 text-indigo-400" />
        <h3 className="text-sm font-medium tracking-widest text-slate-300">鑑定結果の輝きを、あなたの手元へ</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.itemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:items-center text-left sm:text-center p-3 rounded-xl hover:bg-white/5 transition-colors duration-300 border border-transparent hover:border-slate-700"
          >
            <div className="flex-shrink-0 mb-3 sm:mb-4 overflow-hidden rounded-lg bg-slate-800 self-center">
              <img 
                src={item.mediumImageUrls[0]?.imageUrl} 
                alt={item.itemName} 
                className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div>
               <p className="text-xs text-slate-400 line-clamp-2 mb-2 leading-relaxed group-hover:text-indigo-300 transition-colors">
                 {item.itemName}
               </p>
               <p className="text-sm font-mono text-slate-200">
                 ¥{item.itemPrice.toLocaleString()}
               </p>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <span>楽天市場で見る</span>
               <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
