import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {
}

export const Article20220201: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>GitHub Copilotのプレビュー版が使えるようになった。</P>
    </ArticleContent>
  );
});

export default Article20220201;
