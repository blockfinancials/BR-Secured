import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
    h1: {
      fontFamily: '"Passion One", "Arial Black", sans-serif',
      fontWeight: 700,
      fontSize: "8rem",
      color: "#3498db",
      marginBottom: "30px",
      textAlign: "center",
      wordBreak: "break-word",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);