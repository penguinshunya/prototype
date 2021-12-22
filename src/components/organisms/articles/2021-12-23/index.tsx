import { Box } from "@mui/material";
import { memo } from "react";
import ArticleContent from "../../../molecules/article-content";
import { UUIDCreate } from "./UUIDCreate";

interface Props {}

export const Article20211223: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <Box sx={{ my: 2 }}>
        <UUIDCreate />
      </Box>
    </ArticleContent>
  );
});

export default memo(Article20211223);
