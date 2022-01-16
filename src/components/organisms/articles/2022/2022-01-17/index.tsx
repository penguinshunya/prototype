import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const NUMPY_CODE = `
import numpy as np

a = np.zeros((2, 3, 5))

a[0,:,:] = np.zeros((3, 5))
a[:,0,:] = np.zeros((2, 5))
a[:,:,0] = np.zeros((2, 3))

a[0,...] = np.zeros((3, 5))
a[...,0] = np.zeros((2, 3))

a[...,3:] = np.zeros((2, 3, 2))
a[...,:3] = np.zeros((2, 3, 3))

a[...] = np.transpose(np.zeros((5, 2, 3)), (1, 2, 0))
`;

const INPUT_LAYER = `
# レイヤーにNumPyの配列を渡すとEagerTensorになる
x = np.zeros((10, 10))
output = Dense(2)(x)
print(type(output))   #=> EagerTensor

# レイヤーにInputを渡すとKerasTensorになる
input = Input((10, 10))
output = Dense(2)(input)
print(type(output))   #=> KerasTensor

# KerasTensorは、tf.keras.models.Modelを使ったモデルの構築に使用できる
model = tf.keras.models.Model(inputs=input, outputs=output)
model.predict(np.zeros((10000, 10, 10)))

# この方法を使えば、モデルに複数の入力を与えることができる
input1 = Input((10, 20))
input2 = Input((30, 40))
output = Dense(2)([input1, input2])
model = tf.keras.models.Model(inputs=[input1, input2], outputs=output)
model.predict(np.zeros((10000, 10, 20, 30, 40)))
`;

const MULTIPLE_INPUT = `
import numpy as np
import tensorflow as tf

input1 = tf.keras.layers.Input((10, 20))
input2 = tf.keras.layers.Input((10, 30))
output = tf.keras.layers.Dense(30)(input1)
input3 = input2 + output
output = tf.keras.layers.Dense(40)(input3)

model = tf.keras.models.Model(inputs=[input1, input2], outputs=output)
model.predict([np.zeros((10000, 10, 20)), np.zeros((10000, 10, 30))]).shape   #=> (10000, 10, 40)
`;

interface Props {}

export const Article20220117: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        昨日の話の続き。モデルの入力は文書全体（×バッチ数）とそのアテンションマスク、出力は15個の数であることがわかった。カーネルの補足を読むと、「このモデルは、ひとつの文書に複数の同一のクラスが含まれていることは想定していない」と書かれていた。そして、複数の同一のクラスが含まれている場合の解決方法は読者に任せるとも書かれている。いずれは自分で解決できるようになりたいが、今はカーネルの理解に注力する。
      </P>
      <P>
        そういえば、拡張子<code>.npy</code>でNumPyのデータをバイナルファイルとして保存できることを知った。
      </P>
      <P>
        話を戻す。モデルの学習時にxとyを与えているのだけど、yの形式がよくわからない。これはNumPyの基礎知識が足りないからだと思う。ということで次のコードを動かした。すべての行は正しい。両辺の形（
        <code>.shape</code>の値）が同じであれば代入演算子が使えると考えれば良さそう。ついでに、<code>.transpose()</code>
        により次元を好きに入れ替えられる。頻繁に使いそう。
      </P>
      <CodeBlock>{NUMPY_CODE.trim()}</CodeBlock>
      <MyDivider />
      <P></P>
      <CodeBlock>{INPUT_LAYER.trim()}</CodeBlock>
      <P>次のように書くことで、モデルが複数の入力を受け取れる。</P>
      <CodeBlock>{MULTIPLE_INPUT.trim()}</CodeBlock>
      <P>
        <code>Input</code>は関数でありKerasTensorを返す。これは通常のテンソルと同じで<code>input2 + output</code>
        のような演算が可能。
      </P>
      <MyDivider />
      <P>
        <code>keras.layers.Input</code>はレイヤーだと思っていた。その勘違いに気付けて良かった。
      </P>
    </ArticleContent>
  );
});

export default Article20220117;
