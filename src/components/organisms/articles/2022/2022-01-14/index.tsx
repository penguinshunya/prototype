import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Blockquote from "../../../../atoms/blockquote";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import Q from "../../../../atoms/q";
import ArticleContent from "../../../../molecules/article-content";
import multiHeadAttentionImage from "./images/multiHeadAttention.png";

const TRANSFORMER_CODE = `
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
words = tokenizer.tokenize("This is a pen.")
tokenizer.convert_tokens_to_ids(words)  #=> [1188, 1110, 170, 8228, 119]
`;

const TRANSFORMER_CODE2 = `
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
tokenizer.encode("This is a pen.")      #=> [101, 1188, 1110, 170, 8228, 119, 102]
`;

const TOKEN_PLUS = `
tokenizer.encode_plus("This is a pen.", padding="max_length", max_length=16)
`;

const MULTIPLE_ENCODE_PLUS = `
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-cased")
tokenizer.batch_encode_plus([
  "This is a pen.",
  "Who are you? Do you have a pen?",
], return_tensors="tf", padding=True)
`;

const LAYER_TEST = `
import numpy as np
import tensorflow as tf

input = np.random.random((1, 2, 3, 4))
output = tf.keras.layers.Dense(100)(input)

print(input.shape)  #=> (1, 2, 3, 4)
print(output.shape) #=> (1, 2, 3, 100)
`;

const LAYER_CHECK = `
import numpy as np
import tensorflow as tf

input = np.random.random((1, 2, 3, 4))
layer = tf.keras.layers.Dense(100)
output = layer(input)

print(layer.count_params()) #=> 500
print(layer.variables)      # 500個の値が表示される
`;

const LAYER_ERROR = `
import numpy as np
import tensorflow as tf

layer = tf.keras.layers.Dense(100)

layer.count_params()  # ValueError: You tried to call \`count_params\` on layer dense_27, but the layer isn't built.
                      # You can build it manually via: \`dense_27.build(batch_input_shape)\`.
`;

const LAYER_OK = `
import numpy as np
import tensorflow as tf

layer = tf.keras.layers.Dense(100)
layer.build((2, 3, 4))

layer.count_params()  #=> 500
`;

const MATMUL = `
tf.matmul(np.zeros((5, 6, 2, 3)), np.zeros((5, 6, 3, 4))).shape #=> (5, 6, 2, 4)
`;

const MATMUL_T = `
np.zeros((5, 6, 3, 4)).T.shape  #=> (4, 3, 6, 5)
`;

const INSTALL_TENSORFLOWJS = `
pip install tensorflowjs
`;

const CONVERT_TO_TENSORFLOWJS = `
!tensorflowjs_converter --input_format keras PATH TARGET_PATH
`;

const SAVE_TO_TENSORFLOWJS = `
import tensorflow as tf
model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Input((64,)))
model.add(tf.keras.layers.Dense(10, use_bias=False))
model.compile(loss="mean_squared_error", optimizer="adam")

import tensorflowjs as tfjs
tfjs.converters.save_keras_model(model, TARGET_PATH)
`;

const LOAD_MODE_IN_JAVASCRIPT = `
const model = await tf.loadLayersModel("/tensorflow/model.json");
`;

const LAYER_SHAPE = `
layer = LSTM(2, return_sequences=False)
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)

layer = LSTM(2, return_sequences=True)
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 3, 2)
`;

const LAYER_SHAPE_BILSTM = `
layer = Bidirectional(LSTM(2, return_sequences=False))
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 4)

layer = Bidirectional(LSTM(2, return_sequences=True))
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 3, 4)
`;

const LAYER_BIDIRECTIONAL_LSTM = `
layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="concat")
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 4)

layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="sum")
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)

layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="mul")
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)

layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="ave")
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)
`;

const COMPARE_LSTM_BILSTM = `
layer = LSTM(2, return_sequences=False)
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)

layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="sum")
print(layer(np.zeros((100, 3, 5))).shape) #=> (100, 2)
`;

const CUSTOM_LAYER_TO_MODEL = `
layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="sum")

model = Sequential()
model.add(layer)
model.compile(loss="mean_squared_error", optimizer="adam")
# model.summary() # ここをコメントアウトすると実行時エラーが発生する
model.fit(np.zeros((100, 3, 5)), np.ones((100, 2)), epochs=100)
`;

const LAYER_FUNCTION_CALL = `
layer = Bidirectional(LSTM(2, return_sequences=False), merge_mode="sum")
print(layer(np.ones((100, 3, 5))))
print(layer(np.ones((100, 3, 5))))
print(layer(np.ones((100, 3, 5))))
`;

interface Props {}

export const Article20220114: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <code>transformers</code>モジュールを使って英文を単語のインデックスに分解するコードは次のようになる。
      </P>
      <CodeBlock>{TRANSFORMER_CODE.trim()}</CodeBlock>
      <P>上記コードとほぼ同じ結果を得るコードとして次のようなものがある。</P>
      <CodeBlock>{TRANSFORMER_CODE2.trim()}</CodeBlock>
      <P>
        配列の先頭<code>101</code>と末尾<code>102</code>は特殊トークンと呼ばれる。
      </P>
      <P>Attentionを使うときは次のように記述する。</P>
      <CodeBlock>{TOKEN_PLUS.trim()}</CodeBlock>
      <P>
        複数の文字列を同時に変換するときは<code>.batch_encode_plus()</code>を使う。
      </P>
      <CodeBlock>{MULTIPLE_ENCODE_PLUS.trim()}</CodeBlock>
      <Q solved>
        <Typography>AttentionとTransformerの違いがわからない</Typography>↓
        <Typography>
          Attentionとは、queryによってmemoryから必要な情報を選択すること。Transformerと呼ばれる大規模なモデルの一部にAttentionが使われている（このAttentionを「Multi-Head
          Attention」と呼ぶ）。
        </Typography>
      </Q>
      <Q solved>
        <Typography>Multi-Head Attentionとは何か？</Typography>↓
        <Typography>
          Transformerで使われているAttentionのこと。次の画像は、Multi-Head
          Attentionを少しだけ簡略化したものの構造である。
        </Typography>
        <Blockquote sx={{ mt: 2 }}>
          <Img src={multiHeadAttentionImage} width={512} />
          <Box sx={{ mt: 2 }}>
            <Typography>
              引用：
              <GLink href="https://qiita.com/halhorn/items/c91497522be27bde17ce">
                作って理解する Transformer / Attention - Qiita
              </GLink>
            </Typography>
          </Box>
        </Blockquote>
        <Typography sx={{ mt: 2 }}>灰色の四角が関数、白の角丸な四角が値を表す。</Typography>
      </Q>
      <MyDivider />
      <P>TensorFlowでは、レイヤーのテストを簡単に行える。次のようなコードを書く。</P>
      <CodeBlock>{LAYER_TEST.trim()}</CodeBlock>
      <P>
        上記コードの実行結果から、<code>Dense</code>は入力テンソルの最後の次元を変えることがわかる。
      </P>
      <P>レイヤーのパラメータ数やパラメータの内容を知りたい場合は、次のように書く。</P>
      <CodeBlock>{LAYER_CHECK.trim()}</CodeBlock>
      <P>次の位置でレイヤー情報を参照すると実行時エラーが発生する。</P>
      <CodeBlock>{LAYER_ERROR.trim()}</CodeBlock>
      <P>
        エラーが発生する理由は、入力が与えられない限りレイヤーのパラメータ数が定まらないため。といっても実際には、入力を与えなくとも
        <code>.build(batch_input_shape)</code>
        を呼び出すことでパラメータ数が定まってくれる。よって以下のコードを実行すると正常終了する。
      </P>
      <CodeBlock>{LAYER_OK.trim()}</CodeBlock>
      <MyDivider />
      <P>3階や4階のテンソル同士の行列積の結果は次のようになる。</P>
      <CodeBlock>{MATMUL.trim()}</CodeBlock>
      <P>
        テンソルの転置は<code>.T</code>で得られる。
      </P>
      <CodeBlock>{MATMUL_T.trim()}</CodeBlock>
      <MyDivider />
      <P>
        学習済みモデルをブラウザ上で動かせるとのこと。学習の必要がないのであれば、こちらのほうがいいかもしれない。オセロAIなどはこちらに当てはまる。ml5.jsというライブラリもあり、これを使うとJavaScriptで機械学習を開発することも可能？公式ドキュメントに面白いことが書かれていた。
      </P>
      <Blockquote>
        <Typography>
          Through some clever and exciting advancements, the folks building TensorFlow.js figured out that it is
          possible to use the web browser's built in graphics processing unit (GPU) to do calculations that would
          otherwise run very slowly using central processing unit (CPU).
        </Typography>
        <Typography sx={{ mt: 2 }}>
          【DeepLによる日本語訳】
          <br />
          TensorFlow.jsを開発する人々は、いくつかの巧妙でエキサイティングな進歩により、中央演算処理装置（CPU）を使用しなければ非常に遅くなる計算を、Webブラウザに内蔵されたグラフィック処理装置（GPU）を使用して行うことが可能であることを突き止めたのです。
        </Typography>
        <Typography sx={{ mt: 2 }}>
          引用：
          <GLink href="https://learn.ml5js.org/#/?id=getting-started">
            ml5 - A friendly machine learning library for the web.
          </GLink>
        </Typography>
      </Blockquote>
      <P>ブラウザ上で機械学習を行うためにトリッキーな方法を取り入れているようだ。気が向いたときにまた使ってみる。</P>
      <MyDivider />
      <Q solved>
        <Typography>学習済みモデルの保存、JavaScriptでの利用方法</Typography>↓
        <Typography>
          学習済みモデルの保存には<code>model.save(PATH)</code>を利用する。<code>PATH</code>
          ディレクトリが存在しない場合は作成する。<code>PATH</code>が<code>.h5</code>
          で終わるときは単一のファイルが生成される。TensorFlowのドキュメントには<code>.h5</code>
          ファイルをJavaScriptで扱える形式に変換する方法が書かれているため、今回は<code>.h5</code>で保存して話を進める。
        </Typography>
        <Typography sx={{ my: 2 }}>
          <code>.h5</code>ファイルをJavaScriptで扱える形式に変換するためには、Pythonモジュールの
          <code>tensorflowjs</code>が必要である。次のコマンドで<code>tensorflowjs</code>をインストールする。
        </Typography>
        <CodeBlock>{INSTALL_TENSORFLOWJS.trim()}</CodeBlock>
        <Typography sx={{ my: 2 }}>インストール完了後、次のコマンドでJavaScriptから扱える形式にする。</Typography>
        <CodeBlock>{CONVERT_TO_TENSORFLOWJS.trim()}</CodeBlock>
        <Typography sx={{ my: 2 }}>
          上記手順を踏まずとも、Python上で直接JavaScriptの形式でモデルを保存可能である。
        </Typography>
        <CodeBlock>{SAVE_TO_TENSORFLOWJS.trim()}</CodeBlock>
        <Typography sx={{ my: 2 }}>
          この手順により2つのファイルが生成される。ひとつはテキストファイルでもうひとつはバイナリファイル。この2つをWebサーバーから参照できる場所に置き、ブラウザ上で次のコードを実行することでモデルを読み込める。2つのファイルは同じパスに置く必要がある。
        </Typography>
        <CodeBlock>{LOAD_MODE_IN_JAVASCRIPT.trim()}</CodeBlock>
        <Typography sx={{ mt: 2 }}>
          ここで、TensorFlow.jsではカスタムレイヤーやカスタム損失などがサポートされていないことを知った。色々と制限されていそうなので、基本的にはブラウザ上でモデルを動かさないほうが良いかもしれない。
        </Typography>
      </Q>
      <MyDivider />
      <P>最近したことを徒然に書いていく。</P>
      <P>
        RNNの勉強をした。Kerasの<code>SimpleRNN</code>
        を理解するのが大変だった。よくあるRNNの図ではセルが横に並んでいるが、実際のところはどうなんだろう。
        <code>SimpleRNN</code>と<code>SimpleRNNCell</code>
        は1対1の関係であり、1対多の関係ではない気がする。疑問として書き残しておく。
      </P>
      <Q>
        <Typography>
          <code>SimpleRNN</code>と<code>SimpleRNNCell</code>は1対1の関係か？
        </Typography>
      </Q>
      <P>BiLSTMをまだ試していない。一度試したけれど、まともに使うことができなかった。</P>
      <Q solved>
        <Typography>BiLSTMを使う方法</Typography>↓
        <Typography>次のようなコードを実行することで、レイヤーの返すテンソルの形を知ることができる。</Typography>
        <CodeBlock>{LAYER_SHAPE.trim()}</CodeBlock>
        <Typography>BiLSTMについても同様に知ることができる。</Typography>
        <CodeBlock>{LAYER_SHAPE_BILSTM.trim()}</CodeBlock>
        <Typography>
          単に<code>Bidirectional()</code>
          で囲った場合、単純に出力が2倍になることがわかる。順方向と逆方法の出力を単純に出力するだけであり、それ以上のことはしないのだろうか。
        </Typography>
        <CodeBlock>{LAYER_BIDIRECTIONAL_LSTM.trim()}</CodeBlock>
        <Typography>
          上記のように、<code>merge_mode</code>によって出力の形が異なることがわかる。
        </Typography>
        <CodeBlock>{COMPARE_LSTM_BILSTM.trim()}</CodeBlock>
        <Typography>
          <code>merge_mode</code>を<code>"sum", "mul", "ave"</code>のいずれかにすることで、<code>Bidirectional</code>
          で囲った場合と囲わなかった場合の出力の形が同じになることがわかる。よって、LSTMをBiLSTMにしたいときは、単純に
          <code>Bidirectional(merge_mode="sum")</code>などで囲うと良い。
        </Typography>
        <CodeBlock>{CUSTOM_LAYER_TO_MODEL.trim()}</CodeBlock>
        <Typography>上記コードは、レイヤーやモデルのインタフェースの正しさを確認するコードである。</Typography>
        <CodeBlock>{LAYER_FUNCTION_CALL.trim()}</CodeBlock>
        <Typography>
          レイヤーに入力を渡したからといって、レイヤーが学習されるわけではない。上記の3回の出力の内容は同じである。おそらく、レイヤーを学習させるようなメソッドはレイヤー自身には存在しない。学習させたい場合は、モデルを作成してレイヤーを追加し、モデルの
          <code>.fit()</code>を呼び出すのが今のところ一番楽。モデルを使わない場合を考えると、損失関数を用意して
          <code>GradientTape()</code>を使って勾配を計算して最適化関数を用意して…となってちょっと面倒。
        </Typography>
        <MyDivider />
        <Typography>まだ使ったことのないレイヤーを使うときは、次の手順で行えば良さそうだ。</Typography>
        <ol>
          <li>レイヤーのインスタンスを生成する、最小のコードを記述する</li>
          <li>
            関数呼び出しの形式で、先程生成したレイヤーに何らかの入力を渡す（たとえば<code>np.zeros((10, 3, 5))</code>
            など）
          </li>
          <li>
            戻り値の形を<code>.shape</code>で調べる
          </li>
          <li>コンストラクタの引数を変えてみて、出力の変わり方を観察する</li>
          <li>実際に使用するモデルに埋め込む</li>
        </ol>
      </Q>
      <MyDivider />
      <Q>
        <Typography>Transformerの位置エンコーディングの使い方</Typography>↓
        <Typography>
          <GLink href="https://www.tensorflow.org/tutorials/text/transformer?hl=ja">こちらのチュートリアル</GLink>
          をしながら位置エンコーディングについて理解しようと思う。
        </Typography>
        <ul>
          <li>
            <code>SubwordTextEncoder#vocab_size</code>により、全単語の個数を取得できるっぽい
          </li>
          <li>
            <code>SubwordTextEncoder</code>はDeprecatedになっている（<code>tfds.deprecated.text</code>にある）
          </li>
          <li>
            開始トークンと終了トークンには<code>tokenizer.vocab_size</code>と<code>tokenizer.vocab_size+1</code>を利用
          </li>
          <li>トークンの実体は整数</li>
          <li>長さが40トークンを超えるサンプルは削除している</li>
          <li>
            <code>PrefetchDataset</code>オブジェクトには関数型プログラミング用のメソッドが用意されている
          </li>
          <li>位置エンコーディングの項目までに次のことを行った</li>
          <ul>
            <li>文章をトークン化</li>
            <li>トークン化した文章の先頭と末尾に特殊なトークンを追加</li>
            <li>長すぎる文章をデータセットから削除</li>
            <li>パディング（トークン化した文章の長さを同じにするためだと思ったけど、多分違う）</li>
            <li>
              バッチ化（<code>next(iter(datasets))</code>でバッチ数分データを一括取得）
            </li>
          </ul>
        </ul>
        <Typography sx={{ mt: 2 }}>
          ということで、位置エンコーディングのところまで実装を終えた。眠たくてたまらないので外を歩いてくる。
        </Typography>
        <MyDivider />
        <Typography>
          散歩を終えた。位置エンコーディングから再開する。
          <br />
        </Typography>
        <ul>
          <li>位置エンコーディングベクトルは埋め込みベクトルに加算される。埋め込みベクトルってなんだろう？</li>
          <li>
            <L c="d" />
            次元空間において、文中の位置の近さに基づいて近くに位置づけられる
          </li>
          <li>
            <code>tf.linalg.band_part(tf.ones((3, 3)), 1, 1)</code>の実行結果は単位行列っぽいもの。linalgはlinear
            algebraの略で、意味は線形代数
          </li>
          <li>
            <code>1 - tf.linalg.band_part(tf.ones((size, size)), -1, 0)</code>
            で「ルックアヘッド・マスク」を作成。これは、自分よりも先にあるトークンを無視するために使われるマスクである
          </li>
          <li>今回は、「パディングされたトークン」と「未来のトークン」を無視するためにマスクが使われているっぽい</li>
          <li>
            queryとmemoryのkeyの行列積を
            <L c="\sqrt{d_k}" />
            で割る理由は以下のように説明されている。よくわからない。気が向いたときに紙の上で計算する
          </li>
        </ul>
        <Blockquote sx={{ my: 2 }}>
          <Typography>
            例えば、
            <L c="Q" />と<L c="K" />
            が平均
            <L c="0" />
            分散
            <L c="1" />
            だと思ってください。これらの行列積は、平均
            <L c="0" />
            分散は
            <L c="d_k" />
            となります。したがって、（他の数字ではなく）
            <L c="d_k" />
            の平方根をスケーリングに使うことで、
            <L c="Q" />と<L c="K" />
            の行列積においても平均
            <L c="0" />
            分散
            <L c="1" />
            となり、緩やかな勾配を持つソフトマックスが得られることが期待できるのです。
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <GLink href="https://www.tensorflow.org/tutorials/text/transformer?hl=ja">
              言語理解のためのTransformerモデル &nbsp;|&nbsp; TensorFlow Core
            </GLink>
          </Typography>
        </Blockquote>
        <ul>
          <li>
            Attentionを求める式は
            <L c="\mathrm{Attention}(Q, K, V) = \mathrm{softmax}(\frac{QK^T}{\sqrt{d_k}})V" />
          </li>
          <li>
            マスキングは、softmax関数に渡す直前に行われる（マスクが
            <L c="1" />
            の要素に
            <L c="-10^9" />
            が足される）
          </li>
        </ul>
      </Q>
      <MyDivider />
      <P>
        そういえば、TensorFlowという名前に「テンソル」が入っていることに今更気付いた。テンソルの各操作に名前を付けられたり、
        <code>GradientTape()</code>のスコープ内でTensorFlow
        APIを使って計算を行うと自動微分が行えたり、テンソルの保存するデバイスを選べたり…。TensorFlowにおいて、テンソルが中心的存在であることがよく分かる。
      </P>
    </ArticleContent>
  );
});

export default Article20220114;
