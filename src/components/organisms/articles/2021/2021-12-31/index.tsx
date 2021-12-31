import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20211231: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        Stripeを試してみた。思った以上に簡単に使うことができた。サーバー側の実装はわずか10行程度で、クライアント側はエンドポイントへのリクエストだけで良い。
      </P>
      <P>
        実装前に、まずStripeのシークレットキーとPrice
        IDを用意する必要がある。本番環境用のシークレットキーを取得するためにはStripeの審査に通る必要があるが、テスト用のシークレットキーは電話番号認証だけ行えれば良い。Price
        IDは商品に紐付くIDのことで、このIDから商品名や支払い価格などの情報を得る。よって、サーバー側の実装時に商品情報を入力する必要はない。
      </P>
      <P>
        シークレットキーとPrice
        IDの取得が完了すると、サーバー側にエンドポイントを作成する。Node.jsを選択すれば10行ほどで本体部分の実装が終わる。関数にシークレットキーを渡してオブジェクトを取得し、そのオブジェクトのメソッドを呼び出す。メソッドにはPrice
        IDと「成功した時のリダイレクト先URL」と「失敗した時のリダイレクト先URL」の3つを渡す。このメソッドはURLを返す。これは、お支払いページのURLである。あとは、クライアント側にこのURLを渡して色々すると実装が完了する。思った以上に簡単。
      </P>
    </ArticleContent>
  );
});

export default Article20211231;
