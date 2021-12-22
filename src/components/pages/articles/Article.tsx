import { Box, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { memo, useMemo } from "react";

export interface ArticleProps {
  Content: React.VFC;
  date: Dayjs;
  title?: string;
  tags: ("パンヤ" | "プログラミング")[];
};

export const Article: React.VFC<ArticleProps> = memo(({ ...a }) => {
  const date = useMemo(() => a.date.locale("ja").format("YYYY年MM月DD日（dd）"), [a]);

  return (
    <Box component="article" sx={{ mb: 10 }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 24,
          mb: 2,
        }}
      >
        {date}
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {a.tags.map((t) => (
          <Box key={t} sx={{ bgcolor: "rgba(232, 232, 232)", borderRadius: 1, fontSize: 12, padding: "2px 8px" }}>
            {t}
          </Box>
        ))}
      </Box>
      <a.Content />
    </Box>
  );
});

export default memo(Article);
