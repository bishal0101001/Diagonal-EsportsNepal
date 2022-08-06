import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import store from "./store";
import "./index.css";
import App from "./App";
import configureStore from "./store";
// import SocketConnection from "./socketConnection";
// "proxy": "http://127.0.0.1:5000"

// "@mui/icons-material": "^5.2.5",
// "@mui/material": "^5.2.8",
// React-redux 7.1.2

const root = createRoot(document.getElementById("root"));
const store = configureStore();
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
