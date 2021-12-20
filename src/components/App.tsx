import RectRotateBox from "./organisms/rect-rotate-box";
import { Container } from "@mui/material";
import Depression from "./pages/Depression";
import { useEffect, useRef, useState } from "react";

interface Props {}

export const App: React.VFC<Props> = () => {
  const containerRef = useRef<HTMLDivElement>(null!);
  const [containerRect, setContainerRect] = useState<DOMRectReadOnly | null>(null);
  useEffect(() => {
    const div = containerRef.current;
    const observer = new ResizeObserver(entries => {
      for (const e of entries) setContainerRect(e.contentRect);
    });
    observer.observe(div);
    return () => {
      observer.unobserve(div);
    };
  }, []);

  return (
    <Container maxWidth="md" ref={containerRef}>
      <div
        style={{
          marginTop: 16,
          textAlign: "center",
        }}
      >
        {containerRect !== null && (
          <RectRotateBox
            width={containerRect.width}
            height={64}
            count={128}
            lineWidth={2}
            radius={16}
            padding={2}
          />
        )}
      </div>
      <div style={{
        marginBottom: 512,
        marginTop: 16,
      }}>
        <Depression />
      </div>
    </Container>
  );
};

export default App;
