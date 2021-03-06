import { memo } from "react";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20110919: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        先程SepiaWindをサイレント安定7個、セーフティー1個で回ると、2万pp超えました。
        <br />
        54分34秒も掛かりました。かなり危なかったです。
      </P>
      <P>
        10Hや15Hでチップインできたのは嬉しかったです。
        <br />
        これらのホールは高低差が+15mもあり、+5mのときの<span style={{ color: "red" }}>高低差による飛距離補正定数</span>
        が使い物にならないです。
        <br />
        なので、毎回定数の値を勘で変えているのですが、今回はそれがドンピシャでした。
        <br />
        運がよかったです。
      </P>
      <P>最高スコアにppが反映されないのがちょっと残念です。</P>
      <P>
        底辺のスコアたち
        <br />
        どうにかしないといけないです。
      </P>
    </ArticleContent>
  );
});

export default Article20110919;
