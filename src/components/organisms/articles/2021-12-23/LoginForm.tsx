import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { memo, useCallback, useContext, useState } from "react";
import { useMountedState } from "react-use";
import { BaseContext } from "../../../templates/Provider";

interface Input {
  email: string;
  password: string;
}

function initInput(): Input {
  return {
    email: "",
    password: "",
  };
}

interface Props {}

export const LoginForm: React.VFC<Props> = memo(() => {
  const isMounted = useMountedState();
  const { error } = useContext(BaseContext);
  const [ajax, setAjax] = useState(false);
  const [input, setInput] = useState(initInput());

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setAjax(true);
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, input.email, input.password);
      } catch (e: unknown) {
        return error(e);
      } finally {
        if (isMounted()) {
          setAjax(false);
        }
      }
    },
    [error, input, isMounted]
  );

  return (
    <Box>
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, rowGap: 2 }} onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="メールアドレス"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          InputProps={{ sx: { width: 256 } }}
        />
        <TextField
          type="password"
          label="パスワード"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
        <LoadingButton type="submit" loading={ajax} variant="contained">
          ログイン
        </LoadingButton>
      </Box>
    </Box>
  );
});

export default memo(LoginForm);
