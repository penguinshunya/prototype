import { IconButton, Snackbar } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { createContext, useCallback, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const BaseContext = createContext({
  error: (e: unknown) => {},
  success: (message: string) => {},
});

interface Props {}

export const BaseProvider: React.FC<Props> = ({ children }) => {
  const snack = useSnackbar();
  const [message, setMessage] = useState<string | null>(null);
  const [messageOpen, setMessageOpen] = useState(false);

  const success = useCallback((message: string) => {
    setMessage(message);
    setMessageOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setMessageOpen(false);
  }, []);

  const action = useMemo(
    () => (
      <React.Fragment>
        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    ),
    [handleClose]
  );

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
        success,
      }}
    >
      {children}
      <Snackbar
        action={action}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        autoHideDuration={6000}
        open={messageOpen}
        message={message}
        onClose={handleClose}
      />
    </BaseContext.Provider>
  );
};

export default BaseProvider;
