import _ from "lodash";
import { memo, useMemo } from "react";
import { useTitle } from "react-use";
import { articles } from "../../../common/articles";
import { Article } from "../../organisms/article";

interface Props {}

export const ArticlesPage: React.VFC<Props> = memo(() => {
  const sortedArticles = useMemo(() => {
    return _(articles)
      .sortBy((a) => a.date.unix())
      .reverse()
      .value();
  }, []);

  useTitle("試作品");

  return (
    <div>
      {sortedArticles.map((a) => (
        <Article key={a.id} isTitleLink {...a} />
      ))}
    </div>
  );
});

export default ArticlesPage;
