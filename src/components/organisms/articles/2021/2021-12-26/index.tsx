import { Divider } from "@mui/material";
import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20211226: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        Reactで機能を開発するとき、最初は保存先についてまったく考えずに実装すれば良い。保存先として最も簡単なのはメモリであるため、最初は
        <code>useState</code>のみを使って開発していく。このとき、<code>useState</code>
        を直接使わずにフックを介すように実装すると良い。このフックは、<code>loading</code>と<code>data</code>と
        <code>update</code>の3つの値を返すようにする。そして、<code>update</code>は非同期関数にする。
      </P>
      <P>
        <code>useLocalStorage</code>のデータは<code>undefined</code>
        の可能性があるため、そのデータの扱い方を決める必要がある。個人的には、<code>undefined</code>
        の可能性はない気がするので、あまり深く考えずに、<code>undefined</code>のときは初期値を返しておく。
      </P>
      <P>
        実装完了後に、先程作ったフックと同じインタフェースを持つ、保存先が異なるフックを新たに作成する。この保存先はデータベースでもLocalStorageでも何でも良い。この実装が終わると完了である。
      </P>
      <P>
        もしフックとして取り出すのを忘れてしまった場合でも、TypeScriptの型安全性により、後からフックとして取り出すことはそれほど難しくない。
      </P>
      <Divider />
      <P>
        <code>&lt;div /&gt;</code>
        でセルを表現するのは楽だけど、沢山のセルを更新し続けるのはとても重い。4096個のセルを100ミリ秒毎に更新するのはとても重かった。もしかすると、MUIの
        <code>
          &lt;Box sx={"{"}
          {"}"} /&gt;
        </code>
        がとても重いことが原因かもしれない。親に移すことにしよう。
      </P>
      <P>
        <code>&lt;div /&gt;</code>を使うことで重さがなくなった。とりあえずはこれでいい。
      </P>
      <Divider />
      <P>
        これまで、型定義用ファイルtypes.tsxと関数用ファイルfunctions.tsxの2つを作っていたけれど、小さな機能であればtypes-functions.tsxのように1つにまとめて良い気がする。ということで、ライフゲームではまとめる。
      </P>
      <P>
        <code>useReducer</code>
      </P>
    </ArticleContent>
  );
});

export default Article20211226;