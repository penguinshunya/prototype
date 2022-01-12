import { memo } from "react";
import GLink from "../../../../atoms/global-link";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import Q from "../../../../atoms/q";
import { Box, Typography } from "@mui/material";
import CodeBlock from "../../../../atoms/code-block";
import image1 from "./images/loss_accuracy.png";
import Img from "../../../../atoms/image";
import optimizerImage from "./images/optimizer.gif";
import MyDivider from "../../../../atoms/divider";

const LOSS_GRAD = `
model = tf.keras.Sequential([
  tf.keras.layers.Dense(10, activation=tf.nn.relu, input_shape=(4,)),
  tf.keras.layers.Dense(10, activation=tf.nn.relu),
  tf.keras.layers.Dense(3)
])

loss_object = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

def loss(model, x, y):
  y_ = model(x)
  return loss_object(y_true=y, y_pred=y_)

def grad(model, inputs, targets):
  with tf.GradientTape() as tape:
    loss_value = loss(model, inputs, targets)
  return loss_value, tape.gradient(loss_value, model.trainable_variables)
`;

const LOSS_GRADIENT_OPTIMIZER_EPOCH = `
train_loss_results = []
train_accuracy_results = []

num_epochs = 201

for epoch in range(num_epochs):
  epoch_loss_avg = tf.keras.metrics.Mean()
  epoch_accuracy = tf.keras.metrics.SparseCategoricalAccuracy()

  for x, y in train_dataset:
    loss_value, grads = grad(model, x, y)
    optimizer.apply_gradients(zip(grads, model.trainable_variables))

    epoch_loss_avg(loss_value)
    epoch_accuracy(y, model(x))
  
  train_loss_results.append(epoch_loss_avg.result())
  train_accuracy_results.append(epoch_accuracy.result())

  if epoch % 50 == 0:
    print(f"{epoch}, {epoch_loss_avg.result()}, {epoch_accuracy.result()}")
`;

interface Props {}

export const Article20220113: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        昨日に引き続き、
        <GLink href="https://www.tensorflow.org/tutorials/customization/custom_training_walkthrough?hl=ja">
          こちらのチュートリアル
        </GLink>
        を進めていく。
      </P>
      <ul>
        <li>
          notebookに
          <code>
            !echo {"{"}a{"}"}
          </code>
          と書くことで、Pythonの変数をコマンドラインに渡すことができる
        </li>
        <ul>
          <li>
            つまり、ファイルの内容を
            <code>
              !head -n5 {"{"}file_name{"}"}
            </code>
            で確認できる
          </li>
        </ul>
        <li>
          <code>tf.keras.layers.Dense(10, activation=tf.nn.relu)</code>のように、<code>activation</code>
          に文字列以外を渡せる。こちらのほうが個人的に好き
        </li>
        <li>
          <GLink href="https://www.tensorflow.org/api_docs/python/tf/keras/activations?hl=ja">
            Kerasの活性化関数一覧
          </GLink>
        </li>
      </ul>
      <Q sx={{ my: 1 }}>ロジット値とは何か？</Q>
      <ul>
        <li>Pandasの代わりにTensorflowの関数を使うのも良さそう</li>
        <li>
          <code>model(features)</code>では学習は行われない
        </li>
        <li>過学習は答えを丸暗記するようなもの</li>
      </ul>
      <Box sx={{ my: 1 }}>
        <CodeBlock>{LOSS_GRAD.trim()}</CodeBlock>
      </Box>
      <ul>
        <li>上記のように、すべてをTensorFlowのAPIで計算することで自動微分が可能になる</li>
        <ul>
          <li>
            <code>model.trainable_variables</code>は「訓練可能な変数のすべて」？
          </li>
        </ul>
        <li>勾配は、一番急な上りの方向を示す</li>
        <ul>
          <li>よって、勾配の反対方向に進むことで損失関数を小さくできる</li>
        </ul>
        <li>
          <code>learning_rate</code>は、丘を下る際のステップのサイズを表す
        </li>
        <li>
          <code>optimizer.apply_gradients(zip(grads, model.trainable_variables))</code>により、
          <code>model.trainable_variables</code>を書き換えられる
        </li>
        <li>ここまでですべての部品が揃った。モデルを組み立てることができる</li>
        <li>エポックとは、データセットを一通り処理することである</li>
        <li>
          「〜の数」のような変数名をつけたい場合は、<code>num_XXX</code>とすると良さそう
        </li>
        <li>
          <code>tf.keras.metrics.Mean()</code>、<code>tf.keras.metrics.SparseCategoricalAccuracy()</code>
          のように、メトリクス関連のオブジェクトも色々とある
        </li>
      </ul>
      <Q sx={{ my: 1 }}>
        <Typography>
          <code>tf.keras.optimizers</code>、<code>tf.keras.losses</code>、<code>tf.keras.metrics</code>、
          <code>tf.keras.layers</code>、<code>tf.keras.models</code>といったモジュールのAPIを一通り眺めたい
        </Typography>
      </Q>
      <ul>
        <li>
          以下のコードは、損失関数で損失と勾配を計算し、最適化関数でニューラルネットワークの変数を書き換える、という操作を201回繰り返すコードである。途中の損失と正解率を配列に保存し、50回毎に損失と正解率を出力する
        </li>
      </ul>
      <Box sx={{ my: 1 }}>
        <CodeBlock>{LOSS_GRADIENT_OPTIMIZER_EPOCH.trim()}</CodeBlock>
      </Box>
      <P sx={{ my: 1 }}>損失と正解率の推移は次のようになる。</P>
      <Box sx={{ my: 1 }}>
        <Img src={image1} width={512} />
      </Box>
      <Box component="blockquote" sx={{ my: 1 }}>
        <div>
          <Img src={optimizerImage} width={512} />
        </div>
        <Box sx={{ mt: 2 }}>
          <Typography>
            最適化アルゴリズムの違いを確認できる画像
            <br />
            (Source: <GLink href="http://cs231n.github.io/neural-networks-3/">Stanford class CS231n</GLink>, MIT
            License, Image credit: <GLink href="https://twitter.com/alecrad">Alec Radford</GLink>)
          </Typography>
        </Box>
      </Box>
      <P>
        「<code>tf.GradientTape()</code>
        とは何か？」という疑問を掘り下げていくことにより、TensorFlowの最適化の方法をコードレベルで理解できた。これは予期していなかった。更に「勾配」「最適化アルゴリズム」といった、聞いたことがあるけれど意味はよく知らない用語についても深く理解することができた。これからは、
        <code>model.compile()</code>の<code>optimizer</code>引数に<code>mse</code>
        などを渡すことはないし、勾配を求めたいときに頑張って微分を行うことはない。
      </P>
      <MyDivider />
      <P>
        数日前に比べれば、様々なことができるようになった。次は実践的な力をつけるために、Kaggleのコンペに参加したい。
      </P>
    </ArticleContent>
  );
});

export default Article20220113;
