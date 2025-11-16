// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext"; // named export
import "./styles/global.css";
import "./styles/animations.css";

// Optional: MUI theme wrapper (if you created it)
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/theme";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>
);