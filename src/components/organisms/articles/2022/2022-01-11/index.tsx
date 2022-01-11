import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import subplots1 from "./images/subplots.png";

const SUBPLOT = `
x = np.linspace(-3, 3, 100)
y = x ** 2
fig, ax = plt.subplots(nrows=2, ncols=2)
ax[0][0].plot(x, y)
x = np.linspace(-3, 3, 100)
y = x ** 3
ax[1][1].plot(x, y)
`;

const TF_IDF = `
corpus = [
  'this is the first document',
  'this document is the second document',
  'and this is the third one',
  'is this the first document'
]
vocabulary = ['this', 'document', 'first', 'is', 'second', 'the', 'and', 'one']
pipe = Pipeline([
  ("count", CountVectorizer(vocabulary=vocabulary)),
  ("tfid", TfidfTransformer())
]).fit(corpus)

pipe["count"].transform(corpus).toarray()
pipe["tfid"].idf_
`;

const TF_IDF2 = `
> pipe["tfid"].idf_
array([1.        , 1.22314355, 1.51082562, 1.        , 1.91629073,
       1.        , 1.91629073, 1.91629073])
`;

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
      <MyDivider />
      <P>時系列データの扱い方がよくわかっていないので、Kaggleにあるコースを受講することにした。</P>
      <ul>
        <li>重みはregression coefficientとも呼ばれ、バイアスはinterceptとも呼ばれる</li>
        <li>
          Lag featuresとは、ひとつ前のデータのこと、たとえば売上個数が
          <L c="100, 120, 130" />
          のとき、Lag featuresを加えて
          <L c="(100, \mathrm{NaN}), (120, 100), (130, 120)" />
          に変換する
        </li>
        <li>機械学習アルゴリズムを時系列問題に適用する際は、Time-step featuresかLag featuresを利用することが主</li>
        <li>
          <code>sns.regplot()</code>を使うとscatterに線形補間をした直線を描いてくれる。<code>order=3</code>
          を渡すと3次曲線も描ける
        </li>
        <li>
          <code>plt.subplots()</code>の使用例は以下
        </li>
      </ul>
      <Box sx={{ my: 0.5 }}>
        <CodeBlock>{SUBPLOT.trim()}</CodeBlock>
      </Box>
      <Box sx={{ my: 0.5 }}>
        <Img src={subplots1} width={384} />
      </Box>
      <ul>
        <li>Serial Dependenceがよくわからない</li>
        <li>
          <code>fig, ax = plt.subplots()</code>を使う理由がわからない
        </li>
        <li>線形回帰が複雑なアルゴリズムに比べて優れている点は、人にとって説明が容易であること</li>
        <li>
          時系列データをプロットする際に、ウィンドウサイズを規定してその間の平均を描画する。たとえば毎日の温度を記録していて、毎年どのくらいの温度の変化があるかを知りたい場合は、ウィンドウサイズを365として今日から364日前の温度の平均を取る。それをプロットすると、なめらかないい感じのグラフになる
        </li>
        <li>
          <code>Series#shift(1)</code>により、インデックスを固定しながらデータをシフトできる
        </li>
        <li>
          <code>df.rolling()</code>によりウィンドウ化が行える。戻り値は<code>Rolling</code>オブジェクトで、
          <code>.mean()</code>や<code>.sum()</code>などの集計用メソッドが使える
        </li>
        <li>
          <code>from statsmodels.tsa.deterministic import DeterministicProcess</code>
          を使うことで連番を作れるけれど、Google Colabにインストールされている<code>statsmodels</code>
          のバージョンが0.10でありエラーが発生する。<code>!pip install -U statsmodels</code>でアップデートする必要がある
        </li>
        <li>線形回帰のプロットと長期間の移動平均のプロットは同じような形になる</li>
        <li>
          <code>pyearth.Earth</code>を使うと、スプライン（複数の線分が芋づる式に繋がったもの）を生成できる
        </li>
      </ul>
      <MyDivider />
      <P>
        <GLink href="https://www.youtube.com/watch?v=msUWJPXWCUM">Kaggleメルカリコンペの優勝コードを眺める</GLink>
        という動画を見た。うまく機械が学習できるように特徴量を抽出することが何よりも重要なのかも。あとはLightGBMやニューラルネットに渡すだけでいい感じのデータを作ってくれる。
      </P>
      <P>
        そういえば、優勝者のコードはニューラルネットであり、バリデーションを行っていない（おそらく）。コンペではバリデーションが必須であり、ニューラルネットはバリデーションが行えないので戦えない。そう思っていたのでびっくりした。
      </P>
      <P sx={{ mb: 1 }}>
        優勝者のコードで使われているtf-idfとは、単語の重要度を求めるためのもので、scikit-learnを使うと簡単に実装できる。
      </P>
      <CodeBlock>{TF_IDF.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>
        コーパスとは文書の集まりのことである。単語のリストとコーパスを<code>CountVectorizer</code>
        に渡すことで各文書の各単語の出現回数が得られ、それを<code>TfidfTransformer</code>
        に渡すことでTF-IDFを計算してくれる。上のコードの<code>pipe["tfid"].idf_</code>は、各単語の重要度を返す。
      </P>
      <CodeBlock>{TF_IDF2.trim()}</CodeBlock>
      <P sx={{ mt: 1 }}>
        <code>and</code>や<code>one</code>はコーパスにひとつしか存在しないため重要度が高く、<code>the</code>や
        <code>is</code>はすべての文書に存在するため重要度が低くなっている。
      </P>
      <P>
        優勝者は関数型っぽく書いている。まず<code>preprocess()</code>関数を作成し、<code>pd.read_csv()</code>
        から読み込んだ<code>DataFrame</code>を<code>preprocess()</code>に渡すことで変換後の<code>DataFrame</code>
        が得られる。といっても、Pythonの関数にオブジェクトを渡すと、関数内部からオブジェクトを操作したときに呼び出し元にまで影響を与えるため、完全に関数型というわけではない。あまり元のオブジェクトをいじりたくないので、メモリが許すのであれば
        <code>df = df.copy()</code>というコードを<code>preprocess()</code>の先頭に書きたい。
      </P>
      <P>
        <code>preprocess()</code>は僕も取り入れていきたい。
      </P>
    </ArticleContent>
  );
});

export default Article20220111;
