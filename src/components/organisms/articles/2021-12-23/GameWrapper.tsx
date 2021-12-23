import { memo } from "react";
import { useFirebaseUser } from "./hooks";
import { LoginForm } from "./LoginForm";
import LogoutForm from "./LogoutForm";

interface Props {
}

export const GameWrapper: React.VFC<Props> = memo(() => {
  const user = useFirebaseUser();

  if (user === null) {
    return <LoginForm />;
  }
  
  return (
    <>
      <LogoutForm />
    </>
  );
});

export default memo(GameWrapper);
