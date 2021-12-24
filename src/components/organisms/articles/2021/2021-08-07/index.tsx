import { Divider } from "@mui/material";
import { memo } from "react";
import GlobalLink from "../../../../atoms/global-link";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20210807: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>小林さんちのメイドラゴン</P>
      <Divider />
      <P>
        可愛らしいフォント
        <br />
        <GlobalLink href="https://fonts.google.com/specimen/M+PLUS+Rounded+1c">https://fonts.google.com/specimen/M+PLUS+Rounded+1c</GlobalLink>
      </P>
      <P>
        可愛らしい英語フォント
        <br />
        <GlobalLink href="https://fonts.google.com/specimen/Kanit?query=Kanit">https://fonts.google.com/specimen/Kanit?query=Kanit</GlobalLink>
      </P>
      <P>
        日本語の記号を半角にするフォント
        <br />
        <GlobalLink href="https://yakuhanjp.qranoko.jp/">https://yakuhanjp.qranoko.jp/</GlobalLink>
      </P>
    </ArticleContent>
  );
});

export default Article20210807;
