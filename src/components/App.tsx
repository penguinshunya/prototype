import { Box, Button, Container } from "@mui/material";
import { useCallback, useContext } from "react";
import Div100vh from "react-div-100vh";
import { Route, Routes } from "react-router-dom";
import { useMeasure } from "react-use";
import { v4 as uuidv4 } from "uuid";
import GlobalLink from "./atoms/global-link";
import LocalLink from "./atoms/local-link";
import { ArticlePage } from "./pages/article";
import ArticlesPage from "./pages/articles";
import { BaseContext } from "./templates/Provider";

interface Props {}

export const App: React.VFC<Props> = () => {
  const { success } = useContext(BaseContext);
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const handleClickUUID = useCallback(async () => {
    const uuid = uuidv4();
    await navigator.clipboard.writeText(uuid);
    success(`生成した UUID をクリップボードにコピーしました`);
  }, [success]);

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
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            mx: "auto",
            py: 1,
            width: width ?? "initial",
          }}
        >
          <Box sx={{ columnGap: 2, display: "flex" }}>
            <LocalLink to="/">Top</LocalLink>
          </Box>
          <Box sx={{ alignItems: "center", columnGap: 2, display: "flex" }}>
            <GlobalLink href="https://app.netlify.com/sites/vigorous-jones-3867b6/overview">Netlify</GlobalLink>
            <GlobalLink href="https://github.com/penguinshunya/prototype">GitHub</GlobalLink>
            <Button size="small" variant="outlined" onClick={handleClickUUID}>
              UUID生成
            </Button>
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
