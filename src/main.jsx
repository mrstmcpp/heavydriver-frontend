import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // or your styles
import { PrimeReactProvider } from "primereact/api";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <PrimeReactProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </PrimeReactProvider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
