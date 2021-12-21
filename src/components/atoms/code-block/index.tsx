import { Box } from "@mui/system";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";

type Props = SyntaxHighlighterProps & {};

export const CodeBlock: React.VFC<Props> = ({ children }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "rgb(248, 248, 248)",
        p: 1,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Box>
  );
};

export default CodeBlock;
