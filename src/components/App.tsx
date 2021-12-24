import { Box, Container, Link } from "@mui/material";
import Div100vh from "react-div-100vh";
import { Link as RrdLink, Route, Routes } from "react-router-dom";
import { useMeasure } from "react-use";
import { ArticlePage } from "./pages/article";
import ArticlesPage from "./pages/articles";

interface Props {}

export const App: React.VFC<Props> = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

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
            width: width ?? "initial",
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
      <Container maxWidth="md" ref={ref} sx={{ bgcolor: "white", pt: 2 }}>
        <Routes>
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/" element={<ArticlesPage />} />
        </Routes>
      </Container>
    </Div100vh>
  );
};

export default App;
