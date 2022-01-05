import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220103: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        昨日は機械学習について学んだ。まだアルゴリズムの選択やハイパーパラメータの設定は適切に行えないけれど、機械学習を行う流れは理解できた。簡単な回帰や分類であれば、ググりながら実装できると思う。
      </P>
      <P>
        ランダムに生成したデータを解析しても面白くないので、Kaggleにあるデータを解析して、それらしい答えを出してみようと思う。まだニューラルネットワークの構築は行えないので、重回帰分析などで予測する。
      </P>
    </ArticleContent>
  );
});

export default Article20220103;
