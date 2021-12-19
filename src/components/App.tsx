import { CODE } from "./constraints";
import RectRotateBox from "./organisms/rect-rotate-box";
import Pre from "./atoms/Pre";
import { Container } from "@mui/material";

interface Props {}

export const App: React.VFC<Props> = () => {
  return (
    <Container maxWidth="md">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <RectRotateBox
          width={256}
          height={64}
          count={32}
          lineWidth={2}
          radius={16}
        />
      </div>
      <div
        style={{
          display: "grid",
        }}
      >
        <Pre>{CODE}</Pre>
      </div>
    </Container>
  );
};

export default App;
