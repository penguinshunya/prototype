import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "dayjs/locale/ja";
import ja from "dayjs/locale/ja";
import { initializeApp } from "firebase/app";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import BaseProvider from "./components/templates/Provider";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyA73vYC2x0h4imL3qO-6kwFYsQi2gDyuw4",
  authDomain: "prototype-penguinshunya-com.firebaseapp.com",
  projectId: "prototype-penguinshunya-com",
  storageBucket: "prototype-penguinshunya-com.appspot.com",
  messagingSenderId: "515717172132",
  appId: "1:515717172132:web:aea26257fc6942f36b0f31",
  measurementId: "G-15229L2FNS"
};

initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
