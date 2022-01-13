import { useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";

type Props = SyntaxHighlighterProps & {};

export const CodeBlock: React.VFC<Props> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "hsl(222, 12%, 90%)",
        lineHeight: 1.82,
        mx: isMobile ? -2 : -3,
        my: 2,
        overflow: "auto",
        p: 2,
        px: isMobile ? 2 : 3,
      }}
    >
      {children}
    </Box>
  );
};

export default CodeBlock;
