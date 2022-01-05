import { memo } from "react";
import Latex from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220106: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        昨日に引き続き『Kaggleで勝つデータ分析の技術』を読んでいく。
      </P>
      <ul>
        <li><code>np.random.RandomState(seed=71).uniform(5.0, 5.1, 10)</code>で、長さ<Latex text="10" />の数列<Latex text="A" />（<Latex text="5.0 \le A_i \lt 5.1" />）を作れる（型は<code>np.ndarray</code>）</li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220106;
