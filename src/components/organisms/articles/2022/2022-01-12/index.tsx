import { Box, Divider, Typography } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import L from "../../../../atoms/latex";
import LocalLink from "../../../../atoms/local-link";
import P from "../../../../atoms/p";
import Q from "../../../../atoms/q";
import ArticleContent from "../../../../molecules/article-content";

const KERAS_CODE = `
inputs = np.random.random([32, 10, 8]).astype(np.float32)
simple_rnn = tf.keras.layers.SimpleRNN(4)
# simple_rnn = tf.keras.layers.RNN(tf.keras.layers.SimpleRNNCell(4))
outputs = simple_rnn(inputs)
`;

const SIMPLE_RNN = `
import numpy as np
import pandas as pd

n = 100
x_train = np.floor(np.random.random([n, 5, 1]) * 100)
y_train = np.array([ np.sum(arr) for arr in x_train.reshape(n, -1) ]).reshape(n, -1)

from keras.models import Sequential
from keras.layers import Dense, SimpleRNN

model = Sequential()
model.add(SimpleRNN(1000, input_shape=(5, 1), return_sequences=False))
model.add(Dense(1, activation="linear"))
model.compile(loss="mean_squared_error", optimizer="adam")
model.summary()

model.fit(x_train, y_train, epochs=1000)

test_n = 100
x_test = np.floor(np.random.random([test_n, 5, 1]) * 100)
y_test = np.array([ np.sum(arr) for arr in x_test.reshape(test_n, -1) ]).reshape(test_n, -1)
df = pd.DataFrame({ "pred": model.predict(x_test).reshape(-1), "true": y_test.reshape(-1) })
df["diff"] = df.apply(lambda x: np.sqrt((x["pred"] - x["true"]) ** 2), axis=1)
df["diff"].mean()
`;

const GRADIENT_TAPE = `
x = tf.Variable(3.0)
with tf.GradientTape() as tape:
  y = 50 * (x ** 2) + 7 * x + 123
tape.gradient(y, x) #=> 307
`;

const MY_LAYER = `
import tensorflow as tf
from keras.layers import Layer

class MyDenseLayer(Layer):
  def __init__(self, num_outputs):
    super(MyDenseLayer, self).__init__()
    self.num_outputs = num_outputs
  def build(self, input_shape):
    self.kernel = self.add_weight("kernel", shape=[input_shape[-1], self.num_outputs])
  def call(self, input):
    return tf.matmul(input, self.kernel)

layer = MyDenseLayer(10)
layer(tf.zeros([10, 5]))
`;

interface Props {}

export const Article20220112: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <Q solved>
        <Typography>
          なぜ<code>SimpleRNN</code>は<code>input_shape</code>が2次元でなければならないか？
        </Typography>
        <MyDivider />
        <Typography>
          そう決められているため。<code>input_shape=(3, 5)</code>のとき、特徴数
          <L c="5" />
          の入力を
          <L c="3" />
          回与えることを意味する。回数を決められないときは<code>input_shape=(None, 5)</code>としても良い。
        </Typography>
      </Q>
      <ul>
        <li>
          <code>return_sequence=False</code>のときはセルの個数分だけ出力が行われ、<code>True</code>
          のときはセルの個数と入力の個数の積だけ出力が行われる
        </li>
        <li>
          NumPyでは<code>np.array([[1], [2, 3]])</code>のようなデータは許されず、<code>SimpleRNN</code>の訓練データは
          <code>np.ndarray</code>型でなければならない。よって、<code>SimpleRNN</code>
          に長さの異なる文章を入れることはできないっぽい。
          <GLink href="https://qiita.com/kento1109/items/b37dd38c18b0575363d5">こちらの記事</GLink>
          では、文章の長さを合わせるためにパディングを行っている。小説などを学習させることは難しそう？
        </li>
      </ul>
      <P>Kerasのレイヤーの動作を確認したい場合は、次のようなプログラムを書くと良い。</P>
      <CodeBlock>{KERAS_CODE.trim()}</CodeBlock>
      <P>
        <code>outputs.shape</code>で、出力された値の形を確認できる。上記コードでは<code>(32, 4)</code>が出力される。
      </P>
      <MyDivider />
      <P>
        <GLink href="https://github.com/keras-team/keras/blob/1900977512f7b5ab949602bbb38f648223829941/keras/layers/recurrent.py#L1521">
          こちら
        </GLink>
        のコードを読んでいると、<code>SimpleRNN()</code>のCall argumentsの項目に「<code>inputs</code>は
        <code>[batch, timesteps, feature]</code>の形の3Dテンソル」と書かれている。
      </P>
      <ul>
        <li>
          <code>keras.backend.run</code>って何？
        </li>
        <li>計算グラフとは、計算をどのように組み合わせるかを表したグラフのこと</li>
        <li>「自動微分」という物凄く惹かれるワード</li>
        <li>
          Pythonでは<code>print(...)</code>のように書ける
        </li>
      </ul>
      <Q solved>
        <Typography>Kerasのコードを読みたい。どのように環境を構築するのが最適か？</Typography>
        <MyDivider />
        <Typography>
          Kerasのコードに<code>print()</code>等を埋め込み、出力を確認しながら読み進めると良い。Google
          Colabではコードを追い辛いため、ローカルにKerasをインストールして利用する。パッケージの場所は
          <code>pip show keras</code>で確認できる。
        </Typography>
        <Typography sx={{ mt: 2 }}>
          余談だけど、<code>SimpleRNN</code>を使っているにも関わらず、<code>SimpleRNN</code>のコンストラクタ内に
          <code>print()</code>
          を書いても何も出力されない、という問題に数十分はまった。原因は、kerasパッケージではなくtensorflowパッケージ内の
          <code>SimpleRNN</code>を書き換えていたため。<code>from keras.layers</code>
          と書いているにも関わらず、頭のどこかで「tensorflowパッケージのものを利用しているに違いない」と思い込んでしまっていた…。
        </Typography>
      </Q>
      <MyDivider />
      <P>以下のコードは、5つの数の合計をRNNにより求めるプログラムである。</P>
      <Box>
        <CodeBlock>{SIMPLE_RNN.trim()}</CodeBlock>
      </Box>
      <P>
        10%以上くらいの確率で差が10以上になるが、残りの90%は10未満に収まっている。思っていたよりも精度が出て嬉しい。それ以上に、
        <code>SimpleRNN</code>を使えるようになったのが嬉しい。ようやくLSTMを試せるときが来た。
      </P>
      <P>
        LSTMを試すのは簡単だった。上記のコードの<code>SimpleRNN</code>を<code>LSTM</code>に置き換えるだけで良かった。
        <code>SimpleRNN</code>のRMSEは約7.0だったのに対し、<code>LSTM</code>のRMSEは約4.0だった。
      </P>
      <P>
        【追記】<code>LSTM</code>の他にも、<code>GRU</code>、<code>CuDNNGRU</code>、<code>CuDNNLSTM</code>
        に置き換えられる。他の部分を書き換える必要はない。
      </P>
      <Q>
        <Typography>
          <code>validation_split</code>を設定することに意味はあるか？
        </Typography>
      </Q>
      <P>
        配列の長さを5から20に、エポック数を2048にして試してみる。すると、<code>SimpleRNN</code>は約95、<code>LSTM</code>
        は約75だった。SimpleRNNは学習が進んでも損失が10000未満にならず、LSTMは学習を進めると順調に損失が減っていき、最終的には1.0を下回った。しかし、新しいデータに対してはRMSEの差が20しかない。LSTMが過学習をしていたと思われる。
      </P>
      <P>
        今回はLSTMの過学習によりスコアの差はそれほど変わらなかったが、長期記憶が正しく動くことは確認できた。
        <code>SimpleRNN</code>の使い方を理解し、<code>SimpleRNN</code>から<code>LSTM</code>
        に置き換えることが容易だとわかったので、これからは自然とこれらのアルゴリズムを選択できると思う。
      </P>
      <P>次は文章をLSTMで解析したい。</P>
      <MyDivider />
      <P>
        RNNの<code>input_shape</code>を<code>(None, 1)</code>にすると、可変長の入力を与えることができる。
      </P>
      <P>
        日本語から英語に翻訳するとき、まず「日本語→意味」のRNNを行ってから「意味→英語」のRNNを行う。このようなモデルをEncoder-Decoderモデルと呼ぶ。このとき「意味→英語」は「固定長→可変長」の変換になるけれど、可変長といっても上限が必要そう。つまり、小説などの文章を出力することはできなさそう。
      </P>
      <P>
        <code>Masking</code>
        というレイヤーがあり、これを使うことで固定長データの一部を無視することができる。SimpleRNNでマスキングを行いたいときは
        <code>mask_zero=True</code>として<code>Embedding</code>レイヤーを使えば良いらしい。
      </P>
      <MyDivider />
      <P>
        日記形式だと「一度書いた文章を修正する」という作業を行わないため、どれだけ文章を書いても成長しないかも知れない。できれば昔書いた文章も気軽に修正できるような仕組みを導入できたら嬉しい。というか、現段階でも修正が可能なのでやってみようかな。
      </P>
      <P>
        疑問を強調表示できるようにした。<code>&lt;Q /&gt;</code>を使うと強調表示できる。
      </P>
      <Q solved>
        <Typography>
          <code>tf.GradientTape()</code>とは何か？どんなときに使われるか？
        </Typography>
        <MyDivider />
        <Typography>
          「自動微分」を行うときに使われる。自動微分というのがどういう仕組で動いているのかわからないが、次のようなコードを書くことで、微分の結果が得られる。
        </Typography>
        <Box sx={{ my: 0.5 }}>
          <CodeBlock>{GRADIENT_TAPE.trim()}</CodeBlock>
        </Box>
        <Typography>
          <L c="y = 50x^2 + 7x + 123" />
          を微分すると
          <L c="y' = 100x + 7" />
          であり、
          <L c="x = 3.0" />
          を代入すると
          <L c="307" />
          である。上記コードの実行結果と一致することが確認できる。
          <br />
          ちなみに、<code>tf.Variable</code>を<code>tf.constant</code>に書き換えると、<code>tape.gradient(y, x)</code>
          の評価値は<code>None</code>になる。TensorFlow内部では定数と変数は区別されており、<code>tape.gradient()</code>
          の第二引数に定数を渡すと<code>None</code>となるようだ。
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography>他にも色々と気付くことがある。</Typography>
          <ul>
            <li>
              <L c="y" />
              の計算式を<code>y = tf.Variable(np.sin(x))</code>とすると<code>None</code>になる
            </li>
            <li>
              <L c="y" />
              の計算式を<code>y = tf.sin(x)</code>とすると<code>1.0</code>になる
            </li>
            <ul>
              <li>どうやら、TensorFlowの関数を利用しないと正しく記録されないようだ</li>
            </ul>
          </ul>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Pythonの何らかの仕組みを利用して実現しているんだろうけど、想像できない。なぜ微分した値を求められるのか。
        </Typography>
      </Q>
      <Q>
        <Typography>
          DNNを構築するときに微分の知識は必要不可欠だと思う。微分について改めてしっかりと理解しておきたい。
        </Typography>
        <MyDivider />
        <Typography>
          実際にTensorFlowを利用して、勾配を利用した誤差の修正プログラムを書けば何か掴めるかも。
          <GLink href="https://www.tensorflow.org/tutorials/customization/custom_training_walkthrough?hl=ja">
            こちら
          </GLink>
          に良さそうなチュートリアルがあるので今からする。
        </Typography>
        <Divider sx={{ my: 1 }} />
        <ul>
          <li>テンソルは多次元配列</li>
          <li>テンソルは変更不可</li>
          <li>
            <code>tf.Tensor</code>と<code>np.ndarray</code>の間の変換は容易
          </li>
          <li>
            <code>Tensor#device</code>により、データを保持しているデバイスを確認できる
          </li>
          <li>
            <code>tf.keras</code>にKeras APIのすべてが含まれている
          </li>
          <li>ほとんどのレイヤーでは、第一引数は出力の次元あるいはチャネル数である</li>
          <li>
            Kerasのレイヤーのすべては
            <GLink href="https://www.tensorflow.org/api_docs/python/tf/keras/layers?hl=ja">こちら</GLink>から確認できる
          </li>
          <li>レイヤーは、関数呼び出しの形式で呼び出せる</li>
          <li>
            <code>layer.variables</code>ですべての変数を調べられる
          </li>
          <li>
            レイヤーの自作は簡単。<code>build(self, input_shape)</code>と<code>call(self, input)</code>を実装する
          </li>
        </ul>
        <Box sx={{ my: 0.5 }}>
          <CodeBlock>{MY_LAYER.trim()}</CodeBlock>
        </Box>
        <ul>
          <li>
            KerasのFunctional APIを使うことで、Skip Connectionを含むDNNを簡単に構築できる。その際に、
            <code>tf.keras.Model</code>を継承したクラスを作ると良い
          </li>
        </ul>
      </Q>
      <Q>
        <Typography>
          <code>tf.dataset.shuffle()</code>の第一引数の意味
        </Typography>
      </Q>
      <Q solved>
        <Typography>
          BiLSTMを試したい。<code>Bidirectional(LSTM())</code>と書くとできそう
        </Typography>
        <MyDivider />
        <Typography>
          <LocalLink to="/article/e46b6639-ca16-4ed3-8313-f5a2613e2431">こちらの記事</LocalLink>にまとめてある。
        </Typography>
      </Q>
      <Q>
        <Typography>自動微分はどのようにして、微分した値を算出しているか？</Typography>
      </Q>
    </ArticleContent>
  );
});

export default Article20220112;
