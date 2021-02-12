import TodoList from "../components/TodoList.js";
import { selectedUserstore } from "../store/reducer.js";
import {
  itemStore,
  addItem,
  getItems,
  updateCompleteToggle,
  deleteItem,
} from "../store/todoreducer.js";

export default async function TodoContainer() {
  const $listUl = document.querySelector(".todo-list");
  const $input = document.querySelector(".new-todo");

  // active user 찾기
  const userInfo = await selectedUserstore.getState();
  const userId = userInfo._id;
  const userName = userInfo.name;
  const state = await itemStore.dispatch(getItems(userId));

  const addTodoItemHandler = async (e) => {
    const content = e.target.value.trim();
    if (e.key === "Enter" && content.length > 0) {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const message = { contents: content };
      itemStore.dispatch(addItem(userId, message));
      $input.value = "";
    }
    render();
  };

  const onCompleteToggleHandler = async (e) => {
    if (e.target.className === "toggle") {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const itemId = e.target.closest("li").id;
      itemStore.dispatch(updateCompleteToggle(userId, itemId));
    }
    render();
  };

  const onDestroyToggleHandler = async (e) => {
    if (e.target.className === "destroy") {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const itemId = e.target.closest("li").id;
      itemStore.dispatch(deleteItem(userId, itemId));
    }
    render();
  };

  const selectPriorityHandler = (e) => {
    console.log(e);
    console.log(e.target.value);
  };

  const render = async () => {
    const userInfo = await selectedUserstore.getState();
    const userId = userInfo._id;
    if (userId) {
      itemStore.dispatch(getItems(userId));
      await TodoList(userId);
    }
  };

  itemStore.subscribe(itemStore.dispatch(getItems(userId)), render);
  render();

  $input.addEventListener("keypress", addTodoItemHandler);
  $listUl.addEventListener("click", onCompleteToggleHandler);
  $listUl.addEventListener("click", onDestroyToggleHandler);
}
