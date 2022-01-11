import { memo } from "react";
import GLink from "../../../../atoms/global-link";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220112: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <ul>
        <li>
          なぜ<code>SimpleRNN</code>は<code>input_shape</code>が3次元でなければならないか？
        </li>
        <li>
          <code>return_sequence=False</code>のときはセルの個数分だけ出力が行われ、<code>True</code>
          のときはセルの個数と入力の個数の積だけ出力が行われる
        </li>
        <li>
          NumPyでは<code>np.array([[1], [2, 3]])</code>のようなデータは許されず、<code>SimpleRNN</code>の訓練データは
          <code>np.ndarray</code>型でなければならない。よって、<code>SimpleRNN</code>
          に長さの異なる文章を入れることはできないっぽい。
          <GLink href="https://qiita.com/kento1109/items/b37dd38c18b0575363d5">こちらの記事</GLink>
          では、文章の長さを合わせるためにパディングを行っている。小説などを学習させることは難しそう？
        </li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220112;
