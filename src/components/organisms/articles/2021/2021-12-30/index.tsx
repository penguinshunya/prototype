import { Box } from "@mui/material";
import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import ColorPicker from "../../../color-picker";

interface Props {}

export const Article20211230: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        プライベートな記事も書きたくなった。誰にも見られたくないというよりは、仕事のことなので非公開にせざるを得ない。しかし、Reactで書いた記事を非公開にすることはできない。必ずGitHubに上げる必要がある。
      </P>
      <P>これはできないものとして諦めることにする。</P>
      <MyDivider />
      <P>
        Color
        Pickerをこちらに移行する。画像を指定範囲内にドラッグすると読み込まれてcanvasに表示される。そして、canvasの点をクリックすると、その部分の色を取得できる。そんなものを移行する。
      </P>
      <Box sx={{ my: 2 }}>
        <ColorPicker />
      </Box>
    </ArticleContent>
  );
});

export default Article20211230;
