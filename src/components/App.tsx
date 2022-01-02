import { Box, Button, Container, Tooltip } from "@mui/material";
import axios from "axios";
import { useCallback, useContext } from "react";
import Div100vh from "react-div-100vh";
import { Route, Routes } from "react-router-dom";
import { useMeasure } from "react-use";
import { v4 as uuidv4 } from "uuid";
import GLink from "./atoms/global-link";
import LocalLink from "./atoms/local-link";
import { ArticlePage } from "./pages/article";
import ArticlesPage from "./pages/articles";
import IndexPage from "./pages/index";
import PrototypesPage from "./pages/prototypes";
import { BaseContext } from "./templates/Provider";

interface Props {}

export const App: React.VFC<Props> = () => {
  const { error, showMessage } = useContext(BaseContext);
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [headerRef, { height }] = useMeasure<HTMLDivElement>();

  const handleClickUUID = useCallback(async () => {
    const uuid = uuidv4();
    await navigator.clipboard.writeText(uuid);
    showMessage(`生成した UUID をコピーしました`);
  }, [showMessage]);

  const handleClickButton = useCallback(async () => {
    try {
      await axios.post("http://localhost:4242/create-checkout-session");
    } catch (e: unknown) {
      return error(e);
    }
  }, [error]);

  return (
    <Div100vh
      style={{
        backgroundColor: "#fafafa",
        overflow: "auto",
        width: "100%",
      }}
    >
      <Button onClick={handleClickButton}>Stripeのお支払ページのURLをサーバー側のログに出力（localhost限定）</Button>
      <Box
        ref={headerRef}
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          position: "sticky",
          top: 0,
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
            <GLink href="https://app.netlify.com/sites/vigorous-jones-3867b6/overview">Netlify</GLink>
            <GLink href="https://github.com/penguinshunya/prototype">GitHub</GLink>
            <Tooltip title="UUIDを生成してクリップボードにコピー">
              <span>
                <Button size="small" variant="outlined" onClick={handleClickUUID}>
                  UUID生成
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      <Container maxWidth="md" ref={ref} sx={{ bgcolor: "white" }}>
        <Routes>
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/articles" element={<ArticlesPage headerHeight={height + 1} />} />
          <Route path="/prototypes" element={<PrototypesPage />} />
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </Container>
    </Div100vh>
  );
};

export default App;
