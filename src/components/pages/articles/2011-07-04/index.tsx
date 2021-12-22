import { memo } from "react";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

interface Props {}

export const Article20110704: React.VFC<Props> = () => {
  return (
    <Article title="2011年07月04日（月）">
      <P>
        直線ACを正確にずらす方法は、モカズラシです。
        <br />
        曲線ABを正確にずらそうとする方法は、クリックズラシやグリーン模様ズラシです。
        <br />
        モカズラシが実は正確にずらせていないのではないか、というモヤモヤはおそらく曲線ABをモカズラシで正確にずらそうとするから発生するものです。
      </P>
      <P>
        モカズラシで正確にずらせるのは曲線ではありません。
        <br />
        例えば、ゲージ10%分を1度分になるように拡大率を調整したあと、ゲージ80%分ずらしたとします。
        <br />
        このとき、8度分ずらしたのかというと、そうではありません。
        <br />
        モカズラシで正確にずらせるのは曲線ではなく直線、ということを知ることでモヤモヤは晴れます。
      </P>
      <P>
        というより、曲線を正確にずらすことは人間には不可能です。
        <br />
        クリックズラシやグリーン模様ズラシも、結局は直線の連続であり曲線ではありません。
        <br />
        なぜ直線の連続なのかというと、ゲージ自体が曲線ではなく直線だからです。
        <br />
        普通の定規で曲線の長さを測るのは不可能なのと同じです。
        <br />
        曲線を正確にずらそうとは考えないようにしましょう。
      </P>
      <P>
        直線の連続のイメージ
      </P>
      <P>
        直線の連続であるクリックズラシ・グリーン模様ズラシには欠点があります。
        <br />
        それは、ゲージ30%分を5回ずらしたときの方向と、ゲージ50%分を3回ずらしたときの方向は違うことです。
        <br />
        クリックズラシ・グリーン模様ズラシで毎回同じ幅をずらすのは困難です。
      </P>
      <P>これらのことを踏まえると、安定して正確にずらす方法はモカズラシだけになります。</P>
      <P>
        しかし、1Wトマのようにカップまでの距離が遠くて係数が小さい場合は、モカズラシもクリックズラシもグリーン模様ズラシも、全くといっていいほどズレ幅は変わりません。
        <br />
        それに、曲線を正確にずらそうとは考えないようにすると書きましたが、カップまでの距離が遠いときは曲線と考えても全く差し支えありません。
        <br />
        なので、はっきり言ってこれらのことを考える必要はありません。
      </P>
      <P sx={{ mt: 5 }}>
        ＜正確にモカズラシをする方法＞
        <br />
        モカズラシで重要な問題は、中心線はどこかという問題です。
      </P>
      <P>
        もしも中心線が横座標320（解像度は640×480）ではなく319や321だったとすると、ゲージ10%=係数になるように調節した倍率が、右にずらしたときと左にずらしたときとで変わってしまいます。
        <br />
        中心線は一体どこかなのかを明らかにする方法は、画面を限りなく縮小することです。
        <br />
        画面を縮小すると、カップは徐々に画面の中心へと近付いていきます。
        <br />
        この性質を利用することで、中心はどこかを調べることができます。
      </P>
      <P>
        中心線は横座標320であることがわかります。
        <br />
        つまり中心線はゲージ50%地点を通る縦線です。
      </P>
      <P>
        当たり前のようなことですが、こういう基本的なことを確認するのはとても大切なことです。
        <br />
        右にゲージ30%ずらして倍率調節して左にゲージ70%分ずらすのと、左にゲージ30%分ずらして倍率調節して左にゲージ70%分ずらすのは、同じ幅をずらしたことになるということです。
        <br />
        前の記事に書いた方法で最初のずらしをすれば、グリーンの起伏を気にする必要もありません。
      </P>
      <P sx={{ mt: 5 }}>
        この文章を全て理解する人がいれば、僕はとても幸せなのです。
        <br />
        ずらしに関する記事おしまい。
      </P>
    </Article>
  );
};

export default memo(Article20110704);
