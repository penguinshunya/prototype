import { Box } from "@mui/system";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";

type Props = SyntaxHighlighterProps & {};

export const CodeBlock: React.VFC<Props> = ({ children }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "#e8e8e8",
        lineHeight: 1.72,
        maxWidth: "100%",
        overflow: "auto",
        p: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default CodeBlock;
