import { Divider, Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import ArticleContent from "../../../molecules/article-content";

interface Props {}

export const Article20210807: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>小林さんちのメイドラゴン</P>
      <Divider />
      <P>
        可愛らしいフォント
        <br />
        <Link href="https://fonts.google.com/specimen/M+PLUS+Rounded+1c" target="_blank">
          https://fonts.google.com/specimen/M+PLUS+Rounded+1c
        </Link>
      </P>
      <P>
        可愛らしい英語フォント
        <br />
        <Link href="https://fonts.google.com/specimen/Kanit?query=Kanit" target="_blank">
          https://fonts.google.com/specimen/Kanit?query=Kanit
        </Link>
      </P>
      <P>
        日本語の記号を半角にするフォント
        <br />
        <Link href="https://yakuhanjp.qranoko.jp/" target="_blank">
          https://yakuhanjp.qranoko.jp/
        </Link>
      </P>
    </ArticleContent>
  );
});

export default Article20210807;
