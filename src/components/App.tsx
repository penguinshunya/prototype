import RectRotateBox from "./organisms/rect-rotate-box";
import { Box, Container } from "@mui/material";
import Depression from "./pages/Depression";
import { useEffect, useRef, useState } from "react";

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
  );
};

export default App;
