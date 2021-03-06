import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { memo, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTitle } from "react-use";
import { articles as ARTICLES } from "../../../common/articles";
import LocalLink from "../../atoms/local-link";
import { Article } from "../../organisms/article";

const PAGE_COUNT = 10;

interface Props {
  headerHeight: number;
}

export const ArticlesPage: React.VFC<Props> = memo(({ headerHeight }) => {
  useTitle("試作品");

  const [params] = useSearchParams();
  const rawPageNumber = params.get("page");
  const pageNumber = useMemo(() => {
    if (rawPageNumber === null) return 0;
    const n = parseInt(rawPageNumber);
    return isNaN(n) ? 0 : n;
  }, [rawPageNumber]);

  const articles = useMemo(() => {
    return _(ARTICLES)
      .sortBy((a) => a.date.unix())
      .reverse()
      .drop(pageNumber * PAGE_COUNT)
      .take(PAGE_COUNT)
      .value();
  }, [pageNumber]);

  const hasPrev = useMemo(() => pageNumber > 0, [pageNumber]);
  const hasNext = useMemo(() => {
    return (pageNumber + 1) * PAGE_COUNT < ARTICLES.length;
  }, [pageNumber]);

  return (
    <div>
      {articles.length === 0 ? (
        <Typography sx={{ pb: 10 }}>検索条件に一致する記事がありません</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              py: 2,
              zIndex: (theme) => theme.zIndex.appBar - 1,
            }}
          >
            <div>{hasPrev && <LocalLink to={`?page=${pageNumber - 1}`}>前の{PAGE_COUNT}件</LocalLink>}</div>
            <div>{hasNext && <LocalLink to={`?page=${pageNumber + 1}`}>次の{PAGE_COUNT}件</LocalLink>}</div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 10, pb: 8 }}>
            {articles.map((a) => (
              <Article key={a.id} isTitleLink {...a} />
            ))}
          </Box>
        </>
      )}
    </div>
  );
});

export default ArticlesPage;
