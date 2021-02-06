import { repository } from "./api.js";
import createStore from "./store.js";

const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";

export const getAllUsers = () => ({ type: GET_USERS });

const initialState = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return repository.getAllUsers();

    default:
      return state;
  }
}

export const store = createStore(initialState, reducer);
