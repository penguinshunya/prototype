import { memo } from "react";
import ArticleContent from "../../../../molecules/article-content";
import P from "../../../../atoms/p";
import L from "../../../../atoms/latex";

interface Props {}

export const Article20220116: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        昨日はKaggleコンペにカーネルを提出し、780人中363位になった。といっても人のカーネルを丸パクリしただけだけど…。ちょっとそれは気に食わないので、これからカーネルの中身を読んでいこうと思う。
      </P>
      <ul>
        <li>
          transformersモジュールのすべてを<code>*</code>でインポートしている
        </li>
        <li>
          KaggleカーネルのTensorFlowのバージョンは2.6.2らしい。<code>tf.__version__</code>で出力できる
        </li>
        <li>
          <code>auto_mixed_precision</code>とは何か
        </li>
        <li>
          <code>AutoTokenizer</code>が使われている
        </li>
        <li>
          <code>MAX_LEN = 1024</code>としていて、
          <L c="10^7(\fallingdotseq 15594 * 1024)" />
          の大きさの配列を2つ用意している。名前は<code>train_tokens</code>と<code>train_attention</code>。型は整数型
        </li>
        <li>
          と思ったけれど、上記の大きさの配列を他に14個作っている（メモリが心配になる）。分類するカテゴリの個数分用意している感じ。実行すると20MBくらいしか増えなかった
        </li>
        <li>
          ファイルは<code>open(filename, "r").read()</code>で読み取る
        </li>
        <li>
          <code>tokenizer.encode_plus(txt, max_length=MAX_LEN, padding="max_length")</code>でトークンに分割。
          <code>train_tokens</code>にトークンIDのリスト、<code>train_attention</code>にマスクを入れている
        </li>
        <li>
          2つのInput層を作成。<code>TFAutoModel</code>
          をインスタンス化して2つのInput層を渡している。インスタンス化時にモデル情報をローカルファイル（tf_model.h5とconfig.json）から読み込んでいる
        </li>
        <li>
          <code>TFAutoModel</code>
          の出力は配列形式になっているそう。その0番目の要素を取得してDense層に渡し、最終的に15個のsoftmaxな値が得られる
        </li>
        <li>
          <code>tf.keras.Model(inputs=[tokens, attention], outputs=x)</code>でモデルを作成
        </li>
        <li>
          <code>model.compile()</code>の<code>loss</code>引数に配列形式で渡している。
          <code>[losses.CategoricalCrossentropy()]</code>みたいな感じで
        </li>
        <li>
          <code>LearningRateScheduler</code>を使ってlearning rateをどんどん下げていく感じ？
        </li>
        <li>
          NumPyは集合関数も色々ある。<code>np.setdiff1d(except, all)</code>で要素を取り除く
        </li>
        <li>
          <code>model.load_weights()</code>も呼び出している
        </li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220116;
