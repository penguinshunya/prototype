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

interface Props {}

export const Article20220114: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P sx={{ mb: 1 }}>
        <code>transformers</code>モジュールを使って英文を単語のインデックスに分解するコードは次のようになる。
      </P>
      <CodeBlock>{TRANSFORMER_CODE.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>上記コードとほぼ同じ結果を得るコードとして次のようなものがある。</P>
      <CodeBlock>{TRANSFORMER_CODE2.trim()}</CodeBlock>
      <P sx={{ mt: 1 }}>
        配列の先頭<code>101</code>と末尾<code>102</code>は特殊トークンと呼ばれる。
      </P>
      <P sx={{ mb: 1 }}>Attentionを使うときは次のように記述する。</P>
      <CodeBlock>{TOKEN_PLUS.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>
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
        <Typography sx={{ mb: 1 }}>
          Transformerで使われているAttentionのこと。次の画像は、Multi-Head
          Attentionを少しだけ簡略化したものの構造である。
        </Typography>
        <Blockquote>
          <Img src={multiHeadAttentionImage} width={512} />
          <Box sx={{ mt: 1 }}>
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
      <P sx={{ mb: 1 }}>TensorFlowでは、レイヤーのテストを簡単に行える。次のようなコードを書く。</P>
      <CodeBlock>{LAYER_TEST.trim()}</CodeBlock>
      <P sx={{ mt: 1 }}>
        上記コードの実行結果から、<code>Dense</code>は入力テンソルの最後の次元を変えることがわかる。
      </P>
      <P sx={{ mb: 1 }}>レイヤーのパラメータ数やパラメータの内容を知りたい場合は、次のように書く。</P>
      <CodeBlock>{LAYER_CHECK.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>次の位置でレイヤー情報を参照すると実行時エラーが発生する。</P>
      <CodeBlock>{LAYER_ERROR.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>
        エラーが発生する理由は、入力が与えられない限りレイヤーのパラメータ数が定まらないため。といっても実際には、入力を与えなくとも
        <code>.build(batch_input_shape)</code>
        を呼び出すことでパラメータ数が定まってくれる。よって以下のコードを実行すると正常終了する。
      </P>
      <CodeBlock>{LAYER_OK.trim()}</CodeBlock>
      <MyDivider />
      <P sx={{ my: 1 }}>3階や4階のテンソル同士の行列積の結果は次のようになる。</P>
      <CodeBlock>{MATMUL.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>3階以上のテンソルの逆行列は次のようになる。</P>
      <CodeBlock>{MATMUL_T.trim()}</CodeBlock>
    </ArticleContent>
  );
});

export default Article20220114;
