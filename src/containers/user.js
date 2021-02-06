import userList from "../components/UserList.js";
import userAddButton from "../components/UserAddButton.js";
import todoList from "../components/TodoList.js";
import { addUser } from "../store/reducer.js";

export default async function user(store) {
  const userDiv = document.getElementById("user-list");
  const userCreateButton = document.querySelector(".user-create-button");

  const state = await store.getState();

  const onUserCreateHandler = async () => {
    const userNameInput = prompt("추가하고 싶은 이름을 입력해주세요.");
    const name = userNameInput.trim();
    if (name.length < 2) {
      alert("이름은 최소 2글자 이상이어야 합니다.");
      return;
    }
    await store.dispatch(addUser(name));
    await render();
  };

  const onClickUser = () =>
    userDiv.addEventListener("click", (e) => {
      if (e.target.classList.contains("user-create-button")) {
        onUserCreateHandler();
      } else {
        const userId = e.target.dataset.userId;
        render(userId);
      }
    });

  const render = async (userId = "") => {
    const id = userId === "" ? state[0]._id : userId;
    await userList(id);
    await userAddButton();
    await todoList(id);
  };

  onClickUser();
  render();
}
