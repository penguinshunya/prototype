import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220111: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        BinaryCrossEntropyとCategoricalCrossEntropyについて理解した。BinaryCrossEntropyは2クラス分類で使用し、CategoricalCrossEntropyは3クラス以上の分類で使用する。
      </P>
    </ArticleContent>
  );
});

export default Article20220111;
