export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case "GET_USERS":
      return action.state;
    case "ADD_USER":
      return action.state;

    default:
      return state;
  }
}
