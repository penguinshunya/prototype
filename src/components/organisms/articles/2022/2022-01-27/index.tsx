import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220127: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>GORMの仕様を再確認する。</P>
      <ul>
        <li>
          モデルに関連するデータを取得する方法には、<code>.Preload()</code>を使う方法と<code>.Association()</code>
          を使う方法がある
        </li>
        <li>
          ユーザー情報の取得は完了しているが、そのユーザーの所属する店舗の情報はまだ取得していない（つまり
          <code>user.Store</code>が空の）とき、
          <code>db.Model(&amp;user).Association("Store").Find(&amp;user.Store)</code>で取得できる
        </li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220127;
