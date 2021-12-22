import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { memo, useMemo } from "react";
import { ArticleType } from "../../../common/articles";

export type ArticleProps = ArticleType & {
  isTitleLink?: boolean;
};

export const Article: React.VFC<ArticleProps> = memo(({ isTitleLink, ...a }) => {
  const date = useMemo(() => a.date.locale("ja").format("YYYY年MM月DD日 dddd"), [a]);

  return (
    <Box component="article" sx={{ pb: 10 }}>
      <Typography
        variant={"h2"}
        component={isTitleLink ? Link : "h2"}
        to={isTitleLink ? `/article/${a.id}` : ""}
        sx={{
          color: "black",
          display: "inline-block",
          fontSize: 24,
          mb: 2,
          textDecoration: "none",
          ":hover": {
            textDecoration: isTitleLink ? "underline" : "none",
          },
        }}
      >
        {date}
      </Typography>
      {a.tags.size > 0 && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {[...a.tags].map((t) => (
            <Box key={t} sx={{ bgcolor: "rgba(232, 232, 232)", borderRadius: 1, fontSize: 12, padding: "2px 8px" }}>
              {t}
            </Box>
          ))}
        </Box>
      )}
      <a.Content />
    </Box>
  );
});

export default Article;
