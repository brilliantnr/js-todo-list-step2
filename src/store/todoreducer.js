import { repository } from "./api.js";
import createStore from "./store.js";

export const GET_ITEMS = "GET_ITEMS";
export const ADD_ITEM = "ADD_ITEM";
export const DELETE_ALL_ITEMS = "DELETE_ALL_ITEMS";
export const DELETE_ITEM = "DELETE_ITEM";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const UPDATE_PRIORITY = "UPDATE_PRIORITY";
export const UPDATE_COMPETE_TOGGLE = "UPDATE_COMPETE_TOGGLE";

export const getItems = (userId) => ({
  type: GET_ITEMS,
  userId: userId,
});
export const addItem = (userId, message) => ({
  type: ADD_ITEM,
  userId: userId,
  message: message,
});
export const deleteAllItems = (userId) => ({
  type: DELETE_ALL_ITEMS,
  userId: userId,
});
export const deleteItem = (userId, itemId) => ({
  type: DELETE_ITEM,
  userId: userId,
  itemId: itemId,
});
export const updateItem = (userId, itemId, message) => ({
  type: UPDATE_ITEM,
  userId: userId,
  itemId: itemId,
  message: message,
});
export const updatePriority = (userId, itemId, message) => ({
  type: UPDATE_PRIORITY,
  userId: userId,
  itemId: itemId,
  message: message,
});

export const updateCompleteToggle = (userId, itemId) => ({
  type: UPDATE_COMPETE_TOGGLE,
  userId: userId,
  itemId: itemId,
});

const initialState = [];

async function itemReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case GET_ITEMS:
      return await repository.getItems(action);
    case ADD_ITEM:
      console.log(action);
      await repository.addItem(action);
      return await repository.getItems(action);
    case DELETE_ALL_ITEMS:
      repository.deleteAllItems(action);
      return repository.getItems(action);
    case DELETE_ITEM:
      repository.deleteItem(action);
      return repository.getItems(action);
    case UPDATE_ITEM:
      repository.updateItem(action);
      return repository.getItems(action);
    case UPDATE_PRIORITY:
      repository.updatePriority(action);
      return repository.getItems(action);
    case UPDATE_COMPETE_TOGGLE:
      repository.updateCompleteToggle(action);
      return repository.getItems(action);
    default:
      return state;
  }
}

export const itemStore = createStore(initialState, itemReducer);

export default {
  itemStore,
  getItems,
  addItem,
  deleteAllItems,
  deleteItem,
  updateItem,
  updatePriority,
  updateCompleteToggle,
};
