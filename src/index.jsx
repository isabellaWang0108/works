import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeAnalytics } from "./utils/analytics";
import "./css/index.css";

initializeAnalytics();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
