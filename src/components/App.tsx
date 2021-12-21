import { Box, Container, Link } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RectRotateBox from "./organisms/rect-rotate-box";
import Depression from "./pages/Depression";

interface Props {}

export const App: React.VFC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [containerRect, setContainerRect] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    const div = containerRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const e of entries) setContainerRect(e.contentRect);
    });
    observer.observe(div);
    return () => {
      observer.unobserve(div);
    };
  }, []);

  return (
    <div style={{
      height: "100vh",
      overflow: "auto",
      width: "100vw",
    }}>
      <Container maxWidth="md" ref={containerRef}>
        <Box sx={{ mb: 5, mt: 1 }}>
          {containerRect !== null && (
            <RectRotateBox width={containerRect.width} height={64} count={128} lineWidth={2} radius={16} padding={2} />
          )}
        </Box>
        <Box sx={{ mb: 16 }}>
          <Depression />
        </Box>
      </Container>
      <Box sx={{
        backgroundColor: "white",
        borderTop: "1px solid rgba(0, 0, 0, 0.2)",
        bottom: 0,
        position: "sticky",
        // https://mui.com/customization/default-theme/
        zIndex: "appBar"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          mx: "auto",
          py: 1,
          width: containerRect?.width ?? "initial",
        }}>
          <Box sx={{ columnGap: 2, display: "flex" }}>
            <Link href="https://app.netlify.com/sites/vigorous-jones-3867b6/overview" target="_blank">Netlify</Link>
            <Link href="https://github.com/penguinshunya/prototype" target="_blank">GitHub</Link>
          </Box>
          <Box sx={{ columnGap: 2, display: "flex" }}>
            <Link href="https://qiita.com/penguinshunya" target="_blank">Qiita</Link>
            <Link href="https://twitter.com/penguinshunya" target="_blank">Twitter</Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default App;
