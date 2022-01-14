import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220115: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>機械学習の勉強が楽しい。これまでできなかったことができるようになっていく。</P>
      <P>昨日は、TensorFlowのチュートリアルに沿ってTransformerを構築した。構築していく上で得た知識を書いていく。</P>
      <P>
        Embeddingを使うことで、整数をベクトルに変換できる。そのベクトルに位置エンコーディングベクトルを足すことにより準備は完了する。Encoder-Decoderモデルでは、このベクトルはまずMulti-Head
        Attentionに渡す。といっても、渡す前にQ、K、Vの各Dense層にベクトルが渡され、その結果がMulti-Head
        Attentionに渡される。
      </P>
    </ArticleContent>
  );
});

export default Article20220115;
