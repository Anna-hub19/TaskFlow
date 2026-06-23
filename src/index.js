import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";
import { BrowserRouter } from "react-router-dom"; // 👈 IMPORTANTE

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>   {/* 👈 ADICIONA AQUI */}
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);