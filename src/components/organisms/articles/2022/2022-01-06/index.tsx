import { Divider } from "@mui/material";
import { memo } from "react";
import GLink from "../../../../atoms/global-link";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220106: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>昨日に引き続き『Kaggleで勝つデータ分析の技術』を読んでいく。</P>
      <ul>
        <li>
          <code>np.random.RandomState(seed=71).uniform(5.0, 5.1, 10)</code>で、長さ
          <L c="10" />
          の数列
          <L c="A" />（<L c="5.0 \le A_i \lt 5.1" />
          ）を作れる（型は<code>np.ndarray</code>）
        </li>
        <li>
          <code>DataFrame#plot(kind="scatter")</code>はあるが、<code>Series#plot(kind="scatter")</code>はない
        </li>
        <li>
          <code>np.linspace(0.0, 1.0, 100)</code>は、初項
          <L c="0.0" />
          、末項
          <L c="1.0" />
          、項数
          <L c="100" />
          の等差数列を作る
        </li>
        <li>
          <code>rand.standard_normal(shape=(3, 5))</code>は、平均
          <L c="0" />
          標準偏差
          <L c="1" />
          の正規分布に従う15個の数からなる3x5行列を作る
        </li>
        <li>
          <code>np.clip(np.linspace(-1, 2, 7), 0, 1)</code>は<code>[0, 0, 0, 0.5, 1, 1, 1]</code>である
        </li>
      </ul>
      <P></P>
      <Divider />
      <P>
        Google Colabで<code>df.plot.</code>と入力すると候補が表示される。候補は次の11個存在する。
      </P>
      <ul>
        <li><code>area</code> : 積層型エリアグラフ</li>
        <li><code>bar</code> : 棒グラフ</li>
        <li><code>barh</code> : 棒グラフ（水平方向）</li>
        <li><code>box</code> : <GLink href="http://www.stat.go.jp/naruhodo/4_graph/shokyu/hakohige.html">箱ひげ図</GLink>。箱ひげ図を使うことで、四分位数を視覚的に表現できる</li>
        <li><code>density</code> : カーネル密度推定プロット。<code>kde</code>と同じ</li>
        <li><code>hexbin</code> : Hexagonal Binning。<code>gridsize</code>で<L c="x" />方向の六角形の個数を指定</li>
        <li><code>hist</code> : ヒストグラム</li>
        <li><code>kde</code> : カーネル密度推定プロット。<code>density</code>と同じ</li>
        <li><code>line</code> : 折れ線グラフ</li>
        <li><code>pie</code> : 円グラフ。必須な引数が<code>y</code>のみなので使いやすい</li>
        <li><code>scatter</code> : 散布図</li>
      </ul>
      <P></P>
      <Divider />
      <P></P>
      <ul>
        
      </ul>
    </ArticleContent>
  );
});

export default Article20220106;
