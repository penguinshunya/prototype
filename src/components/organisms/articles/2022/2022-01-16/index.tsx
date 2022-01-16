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
      <P>
        なんだか全然わからない…。何も考えない状態でコードを読んでも得られるものが少ない。というか、何も記憶に残らない…。ということで、ある程度推察してから読もうと思う。
      </P>
      <P>
        今回のタスクは何だろう？意味のある文章の塊を取ってきて、その塊の種類を求めることである。このためには、まず文書をいくつかの文章の塊に分割し、そして各文章の塊がどの分類に属するかを求める。文書をいくつかの文章の塊に分割するためにはどうすればよいか？文書は…全然騒動できない。これは僕が疲れているからなのか、それともまだ知識が足りないのか。誰かが書いたコードを昨日読んだけれど、ほとんど理解できそうな気がした。ただ、きちんと読もうとすると、カーネルで動かしながらであっても長続きしなかった。途中で変数の意味などを忘れてしまう。まあとりあえず続きを考える。
      </P>
      <P>
        文書を単語の配列に変換する。単語の配列に変換後、それをtransformersのトークンエンコーダに渡す。すると、単語のトークンID、マスクするかどうか、元の文書のオフセットの3つの情報が手に入る。それを、学習済みモデルに渡す。この渡していた学習済みモデルが何だったか忘れたけれど、とりあえずこの学習済みモデルの出力の一部を次の入力として、最終的にDense層を通って活性化関数softmaxに通されて15個の数になって出てくる。15というのはどういう意味だろう？
      </P>
      <P>
        もしこれが分類であるならわかる。分類の数は7種類であり、それを2倍して1を足せば15になるので、何らかの理由で2倍して1足しているんだと思えばわかる。しかし、これがもし分類の数でないとしたら、いったいこの15個の数は何を表しているのか？ということになる。
      </P>
      <P>
        一つの文書に同じ分類に属する複数の文章の塊が存在する、ということはないのだろうか？もしこれが存在しないのであれば、各出力は「分類Aの開始位置」「分類Aの終了位置」…「分類Fの終了位置」「？」の15個となる…。これも間違っていそうだ。なぜかというと、これだと「分類不明の開始位置」と「分類不明の終了位置」がわからないからだ。いったいこの15個の数は何だろう？
      </P>
      <P>
        そもそも入力は何だったかをもう一度考える。入力は<code>.encode_plus()</code>
        の戻り値であるトークン列とアテンションマスクである。出力は何だったか忘れた。トークンがベクトルに変換されるのは学習済みモデルの中だろうか。とりあえず、この学習済みモデルとやらがどういった出力をするかがわからない。ここはコードを読んでみないとわからないことだが、今ある情報で考えられるだけ考えておきたい。
      </P>
      <P>
        モデルがもしEncoder-Decoderモデルであり、学習済みモデルがEncoder部分だけであるのなら、出力は「文章の意味」のようなものになるはずだ。そもそも
        <code>.encode_plus()</code>
        に渡すのは一文だったか、それとも文書だったか、そこも忘れてしまった。もし一文であれば、…そういえば、文書の最大トークン数を1,024に設定していた気がする。これは一文の長さとはとても思えないので、もしかして文書そのものを入力としている？そして1,024よりも多くのトークンを持つ文書は学習リストから取り除く？
      </P>
      <P>
        もしモデルの入力が文書だったらどうなるだろうか？8つのモデルが欲しくなる。分類Aの開始と終了を取り出すモデル、分類Bの開始と終了を取り出すモデル、…、分類不明の開始と終了を取り出すモデルと。そして、各分類が一つの文書に現われる回数は高々5くらいだと思うので、これで行けるのでは？とも思った。
      </P>
      <P>
        別の可能性も考えた。モデルに与える入力が一文とする。そして、その一文の分類を求める。同じ分類に属する文章が続いていると、それらの文章を繋げたものがその分類に属する文章の塊である。これであれば、モデルの出力が15個になることも納得できる。分類不明の場合はsubmission.csvに含める必要はないため、最後の1個だけで表せる。いや、しかし残りの14個の説明がつかない。なぜ2つずつ存在するのか？分類を求めるだけであれば出力はひとつの分類に付き一つだけで良い。いったいどうして2個ずつ用意しているのか。もしかしてこの予想も間違っている？
      </P>
      <P>
        一文を与えて分類することはそれほど難しくないように思える。しかし、文書は文章同士に関係が存在する。たとえば否定的なことを書いていたとしても、…もしかすると与えられたタスクが何かを勘違いしている可能性がある。一文を判定するだけで十分なタスク？それとも文章同士に関係の存在するタスク？もう一度与えられたタスクを認識し直す。
      </P>
      <P>
        どうなんだろう？各文章の塊が「主張」なのか「反証」なのか「証拠」なのか、などを把握するタスクのようだ。これが果たして一文だけを見てわかるものなのだろうか？答えを見てみる。
        <code>model.fit()</code>または<code>model.preduct()</code>
        を呼び出している箇所を特定して、引数として何を渡しているかがわかれば判別できるだろう。
      </P>
    </ArticleContent>
  );
});

export default Article20220116;
