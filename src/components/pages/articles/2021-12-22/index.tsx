import { memo } from "react";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

interface Props {}

export const Article20211222: React.VFC<Props> = () => {
  return (
    <Article title="2021年12月22日（水）">
      <P>
        &lt;br /&gt;しか使わなかった場合、Chrome DevToolsで文章を選択したときに全文が選択されてしまう。これは不便なので、段落ごとに&lt;p /&gt;で囲うのがいいと思う。ということで、これからは&lt;p /&gt;を使っていく。
      </P>
      <P>
        最近は自殺も視野に入れ始めている。自殺した時の写真を自動で撮影してデプロイし、Twitterに自動投稿すればバズりそうだ、などと考えている。まあ実行に移すことはおそらくないけれど。
      </P>
    </Article>
  );
};

export default memo(Article20211222);
