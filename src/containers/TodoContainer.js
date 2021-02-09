import TodoList from "../components/TodoList.js";
import { selectedUserstore } from "../store/reducer.js";

export default async function TodoContainer() {
  const $listUl = document.querySelector(".todo-list");

  // active user 찾기
  const userInfo = await selectedUserstore.getState();
  const userId = userInfo._id;
  const userName = userInfo.name;

  console.log(`userId: ${userId}`);
  console.log(`userName: ${userName}`);

  const render = () => {
    TodoList();
  };

  render();
}
