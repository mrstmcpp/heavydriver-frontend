import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // or your styles
import { PrimeReactProvider } from "primereact/api";
import { SocketProvider } from "./context/SocketContext";
import { ToastProvider } from "./context/ToastContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <PrimeReactProvider>
      <ToastProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </ToastProvider>
    </PrimeReactProvider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
