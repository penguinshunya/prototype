import { Box } from "@mui/system";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";

type Props = SyntaxHighlighterProps & {};

export const CodeBlock: React.VFC<Props> = ({ children }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: "hsl(222, 12%, 96%)",
        lineHeight: 1.69,
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
