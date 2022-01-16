import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const NUMPY_CODE = `
import numpy as np

a = np.zeros((2, 3, 5))

a[0,:,:] = np.zeros((3, 5))
a[:,:,0] = np.zeros((2, 3))
a[:,0,:] = np.zeros((2, 5))

a[0,...] = np.zeros((3, 5))
a[...,0] = np.zeros((2, 3))

a[...,:3] = np.zeros((2, 3, 3))
a[...,3:] = np.zeros((2, 3, 2))

a = np.transpose(np.zeros((5, 2, 3)), (1, 2, 0))
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
        話は戻す。モデルの学習時にxとyを与えているのだけど、yの形式がよくわからない。これはNumPyの基礎知識が足りないからだと思う。ということで次のコードを動かした。すべての行は正しい。両辺の形（
        <code>.shape</code>の値）が同じであれば代入演算子が使えると考えれば良さそう。ついでに、<code>.transpose()</code>
        により次元を好きに入れ替えられる。頻繁に使いそう。
      </P>
      <CodeBlock>{NUMPY_CODE.trim()}</CodeBlock>
    </ArticleContent>
  );
});

export default Article20220117;
