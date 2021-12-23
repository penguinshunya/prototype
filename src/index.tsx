import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import ja from "dayjs/locale/ja";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import BaseProvider from "./components/templates/Provider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "dayjs/locale/ja";

const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
        },
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        sx: {
          mt: 0,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={ja}>
        <SnackbarProvider maxSnack={1}>
          <BrowserRouter>
            <BaseProvider>
              <App />
            </BaseProvider>
          </BrowserRouter>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
