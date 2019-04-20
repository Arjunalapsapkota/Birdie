export const method = (state = { status: false }, action) => {
  switch (action.type) {
    case "Login":
      return { ...state, status: true };
    case "Logout":
      return { ...state, status: false };
    default:
      return state;
  }
};
