import { Box, Container, Link } from "@mui/material";
import { Link as RrdLink, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Div100vh from "react-div-100vh";
import ArticlesPage from "./pages/articles";
import { ArticlePage } from "./pages/article";

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
    <Div100vh
      style={{
        backgroundColor: "#fafafa",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          position: "sticky",
          top: 0,
          // https://mui.com/customization/default-theme/
          zIndex: "appBar",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            py: 1,
            width: containerRect?.width ?? "initial",
          }}
        >
          <Box sx={{ columnGap: 2, display: "flex" }}>
            <Link component={RrdLink} to="/">
              Top
            </Link>
          </Box>
          <Box sx={{ columnGap: 2, display: "flex" }}>
            <Link href="https://app.netlify.com/sites/vigorous-jones-3867b6/overview" target="_blank">
              Netlify
            </Link>
            <Link href="https://github.com/penguinshunya/prototype" target="_blank">
              GitHub
            </Link>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="md" ref={containerRef} sx={{ bgcolor: "white", pt: 2 }}>
        <Routes>
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/" element={<ArticlesPage />} />
        </Routes>
      </Container>
    </Div100vh>
  );
};

export default App;
