import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import P from "../../../../atoms/p";
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

interface Props {}

export const Article20220112: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <ul>
        <li>
          なぜ<code>SimpleRNN</code>は<code>input_shape</code>が3次元でなければならないか？
        </li>
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
      <P sx={{ mb: 1 }}>Kerasのレイヤーの動作を確認したい場合は、次のようなプログラムを書くと良い。</P>
      <CodeBlock>{KERAS_CODE.trim()}</CodeBlock>
      <P sx={{ mt: 1 }}>
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
      <MyDivider />
      <P sx={{ mb: 1 }}>以下のコードは、5つの数の合計をRNNにより求めるプログラムである。</P>
      <Box>
        <CodeBlock>{SIMPLE_RNN.trim()}</CodeBlock>
      </Box>
      <P sx={{ mt: 1 }}>
        10%以上くらいの確率で差が10以上になるが、残りの90%は10未満に収まっている。思っていたよりも精度が出て嬉しい。それ以上に、
        <code>SimpleRNN</code>を使えるようになったのが嬉しい。ようやくLSTMを試せるときが来た。
      </P>
      <P>
        LSTMを試すのは簡単だった。上記のコードの<code>SimpleRNN</code>を<code>LSTM</code>に置き換えるだけで良かった。
        <code>SimpleRNN</code>のRMSEは約7.0だったのに対し、<code>LSTM</code>のRMSEは約4.0だった。
      </P>
      <P>
        配列の長さを5から20に、エポック数を2048にして試してみる。すると、<code>SimpleRNN</code>は約95、<code>LSTM</code>
        は約75だった。SimpleRNNは学習が進んでも損失が10000未満にならず、LSTMは学習を進めると順調に損失が減っていき、最終的には1.0を下回った。しかし、新しいデータに対してはRMSEの差が20しかない。LSTMが過学習をしていたと思われる。
      </P>
      <P>
        今回はLSTMの過学習によりスコアの差はそれほど変わらなかったが、長期記憶が正しく動くことは確認できたので良かった。
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
        <code>Masking</code>というレイヤーがあり、これを使うことで固定長データの一部を無視することができる。SimpleRNNでマスキングを行いたいときは<code>mask_zero=True</code>として<code>Embedding</code>レイヤーを使えば良いらしい。
      </P>
    </ArticleContent>
  );
});

export default Article20220112;
