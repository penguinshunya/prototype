import { Box } from "@mui/material";
import { memo } from "react";
import { useFirebaseUser } from "./hooks";
import { LoginForm } from "./LoginForm";
import LogoutForm from "./LogoutForm";
import { SampleOthello } from "./SampleOthello";

interface Props {}

export const GameWrapper: React.VFC<Props> = memo(() => {
  const user = useFirebaseUser();

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <SampleOthello />
      </Box>
      <LogoutForm />
    </>
  );
});

export default memo(GameWrapper);
