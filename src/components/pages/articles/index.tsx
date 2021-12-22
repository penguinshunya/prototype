import { memo } from "react";
import { articles } from "../../../common/articles";
import { Article } from "../../organisms/article";

interface Props {}

export const ArticlesPage: React.VFC<Props> = memo(() => {
  return (
    <div>
      {articles.map((a) => (
        <Article key={a.id} isTitleLink {...a} />
      ))}
    </div>
  );
});

export default ArticlesPage;
