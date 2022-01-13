import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

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
    </ArticleContent>
  );
});

export default Article20220114;
