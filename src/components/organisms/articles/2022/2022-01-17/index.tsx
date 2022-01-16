import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

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
      <P>話は戻す。モデルの学習時にxとyを与えているのだけど、yの形式がよくわからない。</P>
    </ArticleContent>
  );
});

export default Article20220117;
