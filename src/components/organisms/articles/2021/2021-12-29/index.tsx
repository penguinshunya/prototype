import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20211229: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        パシフィックリリムという企画が面白い。
      </P>
    </ArticleContent>
  );
});

export default Article20211229;
