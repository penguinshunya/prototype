import { Box, Typography } from "@mui/material";
import { memo } from "react";
import LocalLink from "../../atoms/local-link";

interface Props {
  headerHeight: number;
}

export const IndexPage: React.VFC<Props> = memo(({ headerHeight }) => {
  return (
    <Box sx={{ py: 2, height: `calc(100vh - ${headerHeight}px)` }}>
      <Box sx={{ mb: 2 }}>
        <LocalLink to="/prototypes">試作品</LocalLink>
        <Typography>過去に作ったReactコンポーネントの置き場</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <LocalLink to="/articles">日記</LocalLink>
        <Typography>2010年頃からの日記。ただいま移行作業中</Typography>
      </Box>
    </Box>
  );
});

export default IndexPage;
