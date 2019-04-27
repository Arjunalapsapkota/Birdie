import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { loadState, saveState } from "./localStorage";
import { createStore } from "redux";
import store from "./store";
// const reducer = require("./reducer.js").method;
// const persistedState = loadState();
// const store = createStore(reducer, persistedState);
// store.subscribe(() => {
//   saveState(store.getState());
// });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
