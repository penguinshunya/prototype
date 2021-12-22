import { Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import ArticleContent from "../../../molecules/article-content";

interface Props {}

export const Article20110831: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>youtubeにプレイ動画を上げました。</P>
      <P>
        <Link href="http://www.youtube.com/watch?v=WP2ZJSMactg" target="_blank">
          http://www.youtube.com/watch?v=WP2ZJSMactg
        </Link>
      </P>
      <P>
        カップ方向の風角度ではなく、打つ方向の風角度から傾斜影響を求めるようにしました。
        <br />
        そのおかげで、チップインの精度が上がりました。
        <br />
        よかったら見てください。
      </P>
    </ArticleContent>
  );
});

export default Article20110831;
