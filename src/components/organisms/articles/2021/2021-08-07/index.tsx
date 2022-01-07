import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20210807: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>小林さんちのメイドラゴン</P>
      <MyDivider />
      <P>
        可愛らしいフォント
        <br />
        <GLink href="https://fonts.google.com/specimen/M+PLUS+Rounded+1c">
          https://fonts.google.com/specimen/M+PLUS+Rounded+1c
        </GLink>
      </P>
      <P>
        可愛らしい英語フォント
        <br />
        <GLink href="https://fonts.google.com/specimen/Kanit?query=Kanit">
          https://fonts.google.com/specimen/Kanit?query=Kanit
        </GLink>
      </P>
      <P>
        日本語の記号を半角にするフォント
        <br />
        <GLink href="https://yakuhanjp.qranoko.jp/">https://yakuhanjp.qranoko.jp/</GLink>
      </P>
    </ArticleContent>
  );
});

export default Article20210807;
