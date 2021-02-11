import TodoList from "../components/TodoList.js";
import { selectedUserstore } from "../store/reducer.js";
import { addItem, getItems, itemStore } from "../store/todoreducer.js";

export default async function TodoContainer() {
  const $listUl = document.querySelector(".todo-list");
  const $input = document.querySelector(".new-todo");
  const $prioritySelect = document.querySelector("select");

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

  const selectPriorityHandler = (e) => {
    console.log(e);
  };

  const render = async () => {
    const userInfo = await selectedUserstore.getState();
    const userId = userInfo._id;
    if (userId) {
      itemStore.dispatch(getItems(userId));
      TodoList(userId);
    }
  };

  itemStore.subscribe(itemStore.dispatch(getItems(userId)), render);
  render();

  $input.addEventListener("keypress", addTodoItemHandler);
  $prioritySelect.addEventListener("change", selectPriorityHandler);
}
