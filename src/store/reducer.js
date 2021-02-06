import { repository } from "./api.js";
import createStore from "./store.js";

const GET_USERS = "GET_USERS";
const ADD_USER = "ADD_USER";

export const getAllUsers = () => ({ type: GET_USERS });
export const addUser = (name) => ({ type: ADD_USER, name: name });

const initialState = [];

async function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return await repository.getAllUsers();
    case ADD_USER:
      console.log(action);
      await repository.addUser({ name: action.name });
      return await repository.getAllUsers();

    default:
      return state;
  }
}

export const store = createStore(initialState, reducer);
