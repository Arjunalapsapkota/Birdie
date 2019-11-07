import { loadState, saveState } from "./localStorage";
import { createStore } from "redux";

const reducer = require("./reducer.js").method;
const persistedState = loadState();
console.log("persisted state : ", persistedState);
const store = createStore(reducer, persistedState);
store.subscribe(() => {
  saveState(store.getState());
});
export default store;
