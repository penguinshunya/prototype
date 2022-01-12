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
  apiKey: "AIzaSyBB1o2TsoQSWHWUTTzcZW6DfnuLqD1ItSw",
  authDomain: "upbeat-glow-336702.firebaseapp.com",
  projectId: "upbeat-glow-336702",
  storageBucket: "upbeat-glow-336702.appspot.com",
  messagingSenderId: "893593003535",
  appId: "1:893593003535:web:cc564a3c72102595c8257a",
  measurementId: "G-G1K94HS52R",
};

initializeApp(firebaseConfig);

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
    MuiLink: {
      defaultProps: {
        sx: {
          overflowWrap: "break-word",
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
    MuiTypography: {
      defaultProps: {
        lineHeight: 1.69,
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter} locale={ja}>
        <SnackbarProvider dense maxSnack={1}>
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
