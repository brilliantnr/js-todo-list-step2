import { repository } from "./api.js";
import createStore from "./store.js";

export const GET_USERS = "GET_USERS";
export const ADD_USER = "ADD_USER";
export const DELETE_USER = "DELETE_USER";

export const getAllUsers = () => ({ type: GET_USERS });
export const addUser = (name) => ({ type: ADD_USER, name: name });
export const deleteUser = (userId) => ({ type: DELETE_USER, userId: userId });

const initialState = [];
async function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return await repository.getAllUsers();
    case ADD_USER:
      await repository.addUser({ name: action.name });
      return await repository.getAllUsers();
    case DELETE_USER:
      await repository.deleteUser(action.userId);
      return state;

    default:
      return state;
  }
}

export const store = createStore(initialState, reducer);

export const GET_SELECTED_USER = "GET_SELECTED_USER";

export const getSelectedUser = (userId = "") => ({
  type: GET_SELECTED_USER,
  userId: userId,
});

const defaultUserState = {};

async function selectedUserReducer(state = defaultUserState, action) {
  switch (action.type) {
    case GET_SELECTED_USER:
      const totalState = await store.getState();
      if (action.userId === "") {
        action.userId = totalState[0]._id;
      }
      const userInfo = totalState.find((info) => info._id === action.userId);
      return userInfo;

    default:
      return state;
  }
}

export const selectedUserstore = createStore(
  defaultUserState,
  selectedUserReducer
);
