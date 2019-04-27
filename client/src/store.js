import { loadState, saveState } from "./localStorage";
import { createStore } from "redux";

const reducer = require("./reducer.js").method;
const persistedState = loadState();
const store = createStore(reducer, persistedState);
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
