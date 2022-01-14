import { Typography } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import Q from "../../../../atoms/q";
import ArticleContent from "../../../../molecules/article-content";

const DROPOUT = `
import tensorflow as tf
input = tf.random.uniform((2, 3, 5))
output = tf.keras.layers.Dropout(0.1)(input)
print(input)
print(output)
`;

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
      <Q solved>
        <Typography>Transformerではどのように訓練を行い、どのように予測するか？</Typography>
        <MyDivider />
        <Typography>
          訓練データの正解のトークン列の、最後のトークンだけを抜いてTransformerに渡す。そうして得た次トークンの予測が、先程抜いたトークンと一致していれば正解とする。
          <br />
          予測については、エンコーダに翻訳したいトークン列を、デコーダに「文の開始」を表すトークンだけからなるトークン列を渡す。すると次のトークンが得られる。これを繰り返し、予測結果が「文の終わり」を表すトークンになったときに終了する。これで翻訳ができている。
        </Typography>
      </Q>
      <Q>
        <Typography>文をベクトルに変換する方法を知りたい。</Typography>
      </Q>
      <Q>
        <Typography>
          2022年1月時点での、英文をトークン列またはベクトル列に変換する最良の方法。<code>transformers</code>
          モジュールを使う？
        </Typography>
      </Q>
      <Q>
        <Typography>
          <code>Dropout</code>の使い方。次のコードを動かしても出力内容が同じで、ドロップアウトされているように見えない。
        </Typography>
        <CodeBlock>{DROPOUT.trim()}</CodeBlock>
      </Q>
    </ArticleContent>
  );
});

export default Article20220115;
