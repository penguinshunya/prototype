import { LoadingButton } from "@mui/lab";
import { getAuth, signOut } from "firebase/auth";
import { memo, useCallback, useContext, useState } from "react";
import { useMountedState } from "react-use";
import { BaseContext } from "../../../templates/Provider";

interface Props {}

export const LogoutForm: React.VFC<Props> = memo(() => {
  const isMounted = useMountedState();
  const { error } = useContext(BaseContext);
  const [ajax, setAjax] = useState(false);

  const handleClick = useCallback(async () => {
    try {
      setAjax(true);
      const auth = getAuth();
      await signOut(auth);
    } catch (e: unknown) {
      return error(e);
    } finally {
      if (isMounted()) {
        setAjax(false);
      }
    }
  }, [error, isMounted]);

  return (
    <LoadingButton loading={ajax} color="error" variant="contained" onClick={handleClick}>
      ログアウト
    </LoadingButton>
  );
});

export default memo(LogoutForm);
