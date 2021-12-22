import { memo, useMemo } from "react";
import { useParams } from "react-router";
import { articles } from "../../../common/articles";
import Article from "../../organisms/article";

type Params = Record<"id", string>;

interface Props {
}

export const ArticlePage: React.VFC<Props> = memo(() => {
  const params = useParams<Params>();
  const id = useMemo(() => params.id ?? null, [params.id]);
  const article = useMemo(() => {
    if (id === null) return;
    return articles.filter(a => a.id === id)[0];
  }, [id]);

  if (id === null || article == null) {
    return null;
  }
  
  return (
    <Article {...article} id={id} />
  );
});

export default memo(ArticlePage);
