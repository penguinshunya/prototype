import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220111: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        BinaryCrossEntropyとCategoricalCrossEntropyについて理解した。BinaryCrossEntropyは2クラス分類で使用し、CategoricalCrossEntropyは3クラス以上の分類で使用する。
      </P>
      <MyDivider />
      <ul>
        <li>CNNのカーネルがいまいち分からない</li>
        <li>ニューラルネットワークの文脈では「過学習」という単語があまり出てこない。あまり気にしなくて良い？</li>
        <li>TensorFlowを使うと、特に何も設定することなくGPUを使ってくれる</li>
        <li>
          TensorFlowがGPUを使用しているかどうかは、<code>tf.config.experimental.list_physical_devices('GPU')</code>
          で確認できる
        </li>
        <li>
          プログラムの先頭に<code>tf.debugging.set_log_device_placement(True)</code>
          を記述すると、TensorFlowによる演算がどのデバイスで行われたかをログとして確認できるようになる。このログに「CPU」や「GPU」などの文字列が含まれる（ただし学習時も逐次出力されてしまうため注意が必要）
        </li>
        <li>TensorFlowには、TensorFlow Datasetsというすぐに使えるデータセットが用意されている</li>
      </ul>
      <MyDivider />
      <P>
        アイシアさんが動画のコメント欄で、「ニューラルネットは凸でないのになぜ最適化がうまくいくか？」という質問に「わからない。人類の誰にもわからない」と回答していた。ニューラルネットはそういうもの、と割り切って使うのがいいのかもしれない。とりあえず様々なニューラルネットを動かしてみて経験を蓄積していくのが良さそう。
      </P>
    </ArticleContent>
  );
});

export default Article20220111;
