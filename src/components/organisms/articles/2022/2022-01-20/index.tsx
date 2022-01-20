import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220120: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>機械学習はちょっと挫折気味。今はReactでWebアプリケーションを構築している。</P>
      <P>
        テキストをトリプルクリックした時のChromeの選択範囲についてだけれど、テキストが<code>&lt;td /&gt;</code>
        で囲われているときは末尾に空白が入り、<code>&lt;p /&gt;</code>
        で囲われているときは空白が入らない。よって、テキストが頻繁にコピーされる可能性がある場合は、
        <code>&lt;p /&gt;</code>で囲うほうが良い。
      </P>
      <P>テーブル要素内のレコードの順序が時間によって決まるとき、レコードにIDを表示しないほうが良い。</P>
      <MyDivider />
      <P>
        最近、岡田斗司夫さんの動画をよく見る。岡田斗司夫さんの動画を見ていると、人生をもっと楽しまなければ、という気持ちになる。ここ3ヶ月間のほとんどは家に引きこもっていて、人生を楽しめていない。
      </P>
      <P>
        岡田斗司夫さんが、「1週間に1回どこかに探検したほうが良い」と言っていた。確かにそれは楽しそうだ。明日は秩父多摩甲斐国立公園に行こうと思う。なぜ秩父多摩甲斐国立公園かというと、Google
        Mapで見たときに、今住んでいる場所から一番近い自然だと思ったから。もしかすると都内にもっと自然の多い場所がある気がするので、来週はそこに行ってみる。
      </P>
    </ArticleContent>
  );
});

export default Article20220120;
