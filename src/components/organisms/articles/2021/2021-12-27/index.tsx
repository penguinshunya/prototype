import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20211227: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        記事を更新していく過程で、少しでも不便を感じたらすぐに改善していきたい。ということで、UUID生成ボタンを追加した。このボタンを押すことで、UUIDが自動生成されてクリップボードにコピーされる。
      </P>
      <P>
        notistackには気に入らない点があるため差し替えたいのだけど、notistackを直に使っているため差し替えづらい。差し替える下準備として、まずはこれらを1箇所に集めることから考えよう。
        <code>useSnackbar</code>で検索すれば、notistackに依存しているコードがすぐにわかる。
      </P>
      <P>検索すると、たった4箇所でしか使っていなかった。思った以上に簡単に差し替えられそうだ。</P>
      <P>
        何に差し替えるにしても、まずは共通化する必要がある。共通化したものをどこに置こうか。最初に思いつくのは
        <code>BaseContext</code>
        である。今回共通化したものの中には何らかのコンポーネントが含まれている必要があるため、通常の関数やフックだけでは実現できない。やはり実現するためには
        <code>BaseContext</code>しかなさそうだ。ということで<code>BaseContext</code>を使う。
      </P>
      <P>
        MUIの<code>&lt;Snackbar /&gt;</code>は、僕の理想通りのコンポーネントだった。
      </P>
    </ArticleContent>
  );
});

export default Article20211227;
