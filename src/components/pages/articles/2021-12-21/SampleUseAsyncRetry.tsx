import _ from "lodash";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { useCallback, useContext, useState } from "react";
import { ListUsers, User } from "./functions";
import { BaseContext } from "../../../templates/Provider";

interface Props {}

export const SampleUseAsyncRetry: React.VFC<Props> = () => {
  const { error } = useContext(BaseContext);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const handleClick = useCallback(async () => {
    setLoading(true);
    try {
      const users = await ListUsers();
      setUsers(users);
    } catch (e: unknown) {
      return error(e);
    } finally {
      setLoading(false);
    }
  }, [error]);

  return (
    <>
      <LoadingButton
        loading={loading}
        onClick={handleClick}
        variant="outlined"
        style={{
          textTransform: "none",
        }}
      >
        QiitaからユーザーIDを20件取得する
      </LoadingButton>
      {users.length > 0 && (
        <Box
          sx={{
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: 1,
            display: "flex",
            flexWrap: "wrap",
            fontSize: 10,
            mt: 1,
            opacity: loading ? 0.3 : 1.0,
            px: 1,
            py: 0.5,
          }}
        >
          {_.sortBy(users, (u) => u.id)
            .map((u) => u.id)
            .join(", ")}
        </Box>
      )}
    </>
  );
};

export default SampleUseAsyncRetry;
