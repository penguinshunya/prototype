import { Box } from "@mui/material";
import { memo } from "react";
import { Image } from "../../../../atoms/image";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import pangya_724 from "./images/pangya_724.jpeg";
import pangya_725 from "./images/pangya_725.jpeg";

interface Props {}

export const Article20110703: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <span style={{ color: "red" }}>
          カップ中心を最大拡大し、その拡大率を維持したまま、カップ中心がゲージ100%の部分にくるようにする
        </span>
        <br />
        これが、ゲージ50%分左に、正確にずらす方法です。
        <br />
        文章だけではわかりづらいので、画像をつけて説明します。
      </P>
      <P sx={{ mb: 0.5 }}>①カップを画面中心にもってきて、最大拡大します</P>
      <Box>
        <Image src={pangya_724} width={456} />
      </Box>
      <P sx={{ mb: 0.5 }}>②その拡大率を維持したまま、カップの中心がゲージ100%の部分と重なるようにする</P>
      <Box>
        <Image src={pangya_725} width={456} />
      </Box>
      <P>
        これで正確にずらせています。
        <br />
        このずらしが正確かどうかは、もう一度このずらしをすることでわかります。
        <br />
        上ではカップ中心を最大拡大すると書きましたが、中心は別にカップでなくても構いません。
        <br />
        例えば、グリーンの模様を中心と考えてもOKです。
      </P>
      <P>
        ということで、②の状態から今度は右にゲージ50%分ずらしてみます。
        <br />
        すると、画面の中心がカップの中心と重なります。
      </P>
      <P>
        DeepInferno2Hの261yピンは、グリーンの起伏が激しいです。
        <br />
        にもかかわらず、このずらしでは、画面の中心とカップの中心が重なります。
        <br />
        つまりこのずらしは、グリーンの起伏に関係なくずらす幅が同じだということです。
        <br />
        中心の高低差が違ってもずらす幅は同じ、と言い換えることもできます。
      </P>
      <P sx={{ mt: 5, mb: 0.5 }}>
        カップの中心ではなく、ずらした後を最大拡大するというずらしは、正確にずらすことはできません。
        <br />
        このずらしで左にゲージ50%分ずらして右にゲージ50%分ずらしても、画面の中心とカップの中心は重ならないからです。
      </P>
      <Box>
        <Image src={pangya_724} width={456} />
      </Box>
      <P sx={{ mt: 0.5 }}>261yピンでは、このようにずれが生じます。</P>
      <P sx={{ mt: 5 }}>
        今日は「グリーンに起伏があっても正確にずらす方法」を書きました。
        <br />
        次は「正確にずらすの定義は人それぞれ」について書きます。
      </P>
    </ArticleContent>
  );
});

export default Article20110703;
