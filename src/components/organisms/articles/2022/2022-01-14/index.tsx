import { Box, Typography } from "@mui/material";
import { memo } from "react";
import Blockquote from "../../../../atoms/blockquote";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
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
        <Blockquote sx={{ mt: 1 }}>
          <Img src={multiHeadAttentionImage} width={512} />
          <Box>
            <Typography>
              引用：
              <GLink href="https://qiita.com/halhorn/items/c91497522be27bde17ce">
                作って理解する Transformer / Attention - Qiita
              </GLink>
            </Typography>
          </Box>
        </Blockquote>
        <Typography sx={{ mt: 1 }}>灰色の四角が関数、白の角丸な四角が値を表す。</Typography>
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
      <P>3階以上のテンソルの逆行列は次のようになる。</P>
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
    </ArticleContent>
  );
});

export default Article20220114;
