export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("$birdiez2019state$local");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("$birdiez2019state$local", serializedState);
  } catch (err) {
    //return undefined;
  }
};
