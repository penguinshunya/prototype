import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import Anime1 from "./components/Anime1";

interface Props {}

export const Article20220122: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>anime.jsを試したい。</P>
      <P>
        Web上で簡単なアニメーションを行いたいときにCSSを使うと、一度「JavaScriptの世界」から抜け出す必要があり、ReactだとCSSとJavaScriptとの往復が少し面倒。であればJavaScriptでアニメーションを実現しようという話になるのだけど、ピュアなJavaScriptだと少しだけ面倒そう。アニメーション周りは非推奨の機能だらけで正しく選択するのに時間がかかりそうなので、それらをラップして使いやすくしてくれているであろうanime.jsを使うのが最も早く「JavaScriptでのアニメーション」を実現できる気がする。
      </P>
      <P>ということでanime.jsを勉強していく。</P>
      <MyDivider />
      <P>①【移動】を押すと、正方形が回転しながらランダムな位置に移動する</P>
      <Anime1 />
      <P>
        <GLink href="https://css-tricks.com/svg-line-animation-works/">
          How SVG Line Animation Works | CSS-Tricks - CSS-Tricks
        </GLink>
      </P>
    </ArticleContent>
  );
});

export default Article20220122;
