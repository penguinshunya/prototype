import { Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

interface Props {}

export const Article20110716: React.VFC<Props> = () => {
  return (
    <Article title="2011年07月16日（土）">
      <P>
        サイレントを使わずに素BIゲーで限界値出す動画を上げました。
        <br />
        コースはPinkWindです。
      </P>
      <P>
        <Link href="http://zoome.jp/penguinshunya/diary/16" target="_blank">
          http://zoome.jp/penguinshunya/diary/16
        </Link>
      </P>
      <P>宣伝おしまい。</P>
      <P>
        WH-40とか言ってましたが、今はWHを研究する気が起きないので止めにしました。
        <br />
        期待してくださった方々、申し訳ありません。
        <br />
        これからは、変に目標とか立てずに気の向くままにやっていこうと思います。
      </P>
    </Article>
  );
};

export default memo(Article20110716);
