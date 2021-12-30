import { Box } from "@mui/material";
import { memo, useMemo } from "react";
import { useParams } from "react-router";
import { useTitle } from "react-use";
import { articles } from "../../../common/articles";
import Article from "../../organisms/article";

type Params = Record<"id", string>;

interface Props {}

export const ArticlePage: React.VFC<Props> = memo(() => {
  const params = useParams<Params>();
  const id = useMemo(() => params.id ?? null, [params.id]);
  const article = useMemo(() => {
    if (id === null) return;
    return articles.filter((a) => a.id === id)[0];
  }, [id]);

  useTitle(`${article == null ? "試作品" : `${article?.date.locale("ja").format("YYYY年MM月DD日")} - 試作品`}`);

  if (id === null || article == null) {
    return null;
  }

  return (
    <Box sx={{ pb: 10, pt: 2 }}>
      <Article {...article} id={id} />
    </Box>
  );
});

export default ArticlePage;
