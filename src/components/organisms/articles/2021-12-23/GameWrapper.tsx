import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { SampleOthelloByFirestore } from "../../othello/SampleOthelloByFirestore";
import { useFirebaseUser } from "./hooks";
import { LoginForm } from "./LoginForm";
import LogoutForm from "./LogoutForm";

interface Props {}

export const GameWrapper: React.VFC<Props> = memo(() => {
  const user = useFirebaseUser();

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ color: (theme) => theme.palette.error.main, textDecoration: "underline" }}>
          Firestore
        </Typography>
        {user === null ? (
          <Box sx={{ mt: 4, width: 263 }}>
            <LoginForm />
          </Box>
        ) : (
          <>
            <SampleOthelloByFirestore />
            <Box sx={{ mt: 1 }}>
              <LogoutForm />
            </Box>
          </>
        )}
      </Box>
    </>
  );
});

export default memo(GameWrapper);
