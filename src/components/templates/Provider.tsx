import { useSnackbar } from "notistack";
import { createContext, useCallback } from "react";

export const BaseContext = createContext({
  error: (e: unknown) => {
    console.log(true);
  },
});

interface Props {}

export const BaseProvider: React.FC<Props> = ({ children }) => {
  const snack = useSnackbar();

  const error = useCallback(
    (e: unknown) => {
      console.error(e);
      if (e instanceof Error) {
        snack.enqueueSnackbar(e.message, { variant: "error" });
      } else {
        snack.enqueueSnackbar("不明なエラーが発生しました。詳細はコンソールを確認して下さい", { variant: "error" });
      }
    },
    [snack]
  );

  return (
    <BaseContext.Provider
      value={{
        error,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};

export default BaseProvider;
