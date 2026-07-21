import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import theme from "./theme/theme";

import QueryProvider from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider theme={theme}>

        <CssBaseline />

        <QueryProvider>

          <App />

        </QueryProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>
);