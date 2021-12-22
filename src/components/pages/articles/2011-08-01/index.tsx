import { Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

interface Props {}

export const Article20110801: React.VFC<Props> = () => {
  return (
    <Article title="2011年08月01日（月）">
      <P>
        今回は僕の最も好きなコース、DeepInfernoでした。
        <br />
        詳細はこちら→
        <Link href="http://www.newx2.com/pangya/" target="_blank">
          http://www.newx2.com/pangya/
        </Link>
      </P>
      <P>
        1回戦目
        <br />
        8Hは、7mの素BIを外しました。
        <br />
        ワイド画面・フルスクリーンモードでのモカズラシは、旗の輪郭の濃さを見分けるのが難しいです。
        <br />
        これからは、そういう状況でも正確にモカズラシができるようにしないといけないです。
      </P>
      <P>
        2回戦目
        <br />
        7Hはパンミでした。
        <br />
        風がとても良かったので、29分11秒で回り切ることができました。
        <br />
        弱風のときは早打ちしようと決めていたのですが、まさか30分以内で終わるとは思いませんでしたｗ
        <br />
        1回戦目と条件が似ているホールも多かったです。
      </P>
      <P>というわけで、結果は3位でした。</P>
      <P>
        今回は、大会で競い合うこと以上に、少しだけですが、色んな人と会話できたのが楽しかったです。
        <br />
        戎橋で僕に話しかけてくださった方々ありがとうございます。
      </P>
      <P>
        前のシーズンカップの記事で、次はDIだったらいいなと発言して本当にそうなりました。
        <br />
        というわけで、今回も発言しておきます（笑）
        <br />
        運営さん、次のコースはBlueLagoonでお願いしますm(_ _)m
      </P>
    </Article>
  );
};

export default memo(Article20110801);
