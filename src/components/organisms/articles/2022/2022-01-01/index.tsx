import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220101: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        明けましておめでとうございます。今年もよろしくお願いします。
        <br />
        今年は色々な人と話したい。
      </P>
    </ArticleContent>
  );
});

export default Article20220101;
