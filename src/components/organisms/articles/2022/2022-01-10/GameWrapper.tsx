import { Box } from "@mui/material";
import { memo } from "react";
import SampleOthelloByFirestore2 from "../../../othello/SampleOthelloByFirestore2";
import { useFirebaseUser } from "./hooks";
import { LoginForm } from "./LoginForm";
import LogoutForm from "./LogoutForm";

interface Props {}

export const GameWrapper: React.VFC<Props> = memo(() => {
  const user = useFirebaseUser();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {user === null ? (
          <Box sx={{ mt: 4, width: 263 }}>
            <LoginForm />
          </Box>
        ) : (
          <>
            <SampleOthelloByFirestore2 />
            <Box sx={{ mt: 1 }}>
              <LogoutForm />
            </Box>
          </>
        )}
      </Box>
    </>
  );
});

export default GameWrapper;
