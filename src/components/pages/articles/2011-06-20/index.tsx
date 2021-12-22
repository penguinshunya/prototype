import { Box, Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import ArticleContent from "../../../molecules/article-content";
import q1 from "./images/q1.png";
import q2 from "./images/q2.png";
import q3 from "./images/3bai.png";
import abcd from "./images/abcd.png";
import { Image } from "../../../atoms/image";

interface Props {}

export const Article20110620: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>カップ方向の傾斜影響を求める手順を書きます。</P>
      <P>
        ①カップ方向の風角度を読む
        <br />
        ②最大傾斜の比率を求める
        <br />
        ③最大傾斜方向の風角度を読む
        <br />
        ④カップ方向と最大傾斜方向の成す角度から、カップ方向の傾斜比率を求める
        <br />
        ⑤傾斜比率を風速に変換する
      </P>
      <P>それぞれの手順について説明します。</P>
      <P sx={{ mt: 5 }}>
        ①カップ方向の風角度を読む
        <br />
        これらの記事を参考にしてください。
        <br />
        『風角度の読み方』、『風角度の読み方②』、『風角度の読み方まとめ』
        <br />
        『風角度の読み方②』に書いた方法は、短時間で正確な風角度が読めるのでおススメです。
      </P>
      <P sx={{ mb: 0.5 }}>
        ②最大傾斜の比率を求める
        <br />
        この作業をするには、最大傾斜の形の特徴を知っておく必要があります。
      </P>
      <Box sx={{ gap: 1, display: "flex", flexWrap: "wrap" }}>
        <Image src={q1} />
        <Image src={q2} />
      </Box>
      <P sx={{ mt: 0.5 }}>
        この2つの画像の打点は、左右方向には一切動かしていません。
        <br />
        この時、どちらが最大傾斜かというと、右の傾斜です。
        <br />
        打点の中心は、アズテックの中心より左に1pixずれてます。
        <br />
        打点を定規代わりにするときに注意が必要です。
      </P>
      <P sx={{ mb: 0.5 }}>おおよその比率を求める方法を説明します。</P>
      <Box sx={{ gap: 1, display: "flex", flexWrap: "wrap" }}>
        <Image src={q3} />
        <Image src={abcd} />
      </Box>
      <P sx={{ mt: 0.5 }}>
        このような最大傾斜の場合、a, b, c, dの長さの合計が、最大傾斜のおおよその比率になります。
        <br />
        a = 6[pix], b = 13[pix], c = 18[pix], d = 26[pix]
        <br />
        なので、この最大傾斜の比率は63になります。
        <br />
        ただ、それぞれの線の長さを測定するのは時間がかかる上に、この方法で求めた比率は正確ではないので、最大傾斜の形と比率をセットにして覚えておくのが一番だと思います。
      </P>
      <P>
        ③最大傾斜方向の風角度を読む
        <br />
        カップ方向の風角度読みと同じ方法で読みます。
        <br />
        これが意外と難しい・・・。
      </P>
      <P>
        ④カップ方向と最大傾斜方向の成す角度から、カップ方向の傾斜比率を求める
        <br />
        カップ方向の風が右向きの追い風30度、最大傾斜方向の風が右向きの追い風60度の場合、
        <br />
        (カップ方向の傾斜比率) ＝ (最大傾斜の比率) × cos(60° - 30°)
        <br />
        となります。
      </P>
      <P>
        ⑤傾斜比率を風速に変換する
        <br />
        (比率の風速変換値) ＝ (カップ方向の傾斜比率) × α<br />
        αは打つ強さに依存します（合ってるか定かではない）。
      </P>
      <P sx={{ mt: 5 }}>
        最大傾斜の方向を向く作業が一番難しいと思います。
        <br />
        zoomeに上げた僕の動画を参考にしてみてください。
        <br />
        <Link href="http://zoome.jp/penguinshunya/" target="_blank">
          http://zoome.jp/penguinshunya/
        </Link>
        <br />
        ご要望ありがとうございました。
      </P>
    </ArticleContent>
  );
});

export default Article20110620;
