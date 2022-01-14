import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useContext, useRef } from "react";
import { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { useHoverDirty } from "react-use";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { BaseContext } from "../../templates/Provider";

type Props = SyntaxHighlighterProps & {};

export const CodeBlock: React.VFC<Props> = ({ children }) => {
  const { showMessage } = useContext(BaseContext);
  const ref = useRef<HTMLElement>(null!);
  const innerRef = useRef<HTMLDivElement>(null!);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isShow = useHoverDirty(ref);

  const handleClickCopy = useCallback(async () => {
    const div = innerRef.current;
    if (div.textContent !== null) {
      await navigator.clipboard.writeText(div.textContent);
      showMessage("クリップボードにコピーしました");
    }
  }, [showMessage]);

  return (
    <Box
      ref={ref}
      component="pre"
      sx={{
        borderBottom: "1px solid hsl(222, 12%, 84%)",
        borderTop: "1px solid hsl(222, 12%, 84%)",
        backgroundColor: "hsl(222, 12%, 92%)",
        lineHeight: 1.82,
        mx: isMobile ? -2 : -3,
        my: 2,
        overflow: "auto",
        p: 2,
        position: "relative",
        px: isMobile ? 2 : 3,
      }}
    >
      <div ref={innerRef}>{children}</div>
      <Box
        sx={{
          display: isShow ? "block" : "none",
          px: 2,
          py: 1.25,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <IconButton onClick={handleClickCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CodeBlock;
