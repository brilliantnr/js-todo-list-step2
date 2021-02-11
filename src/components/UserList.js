import { selectedUserstore, store } from "../store/reducer.js";

export default async function UserList() {
  const $userDiv = document.getElementById("user-list");

  const state = await store.getState();
  const userInfo = await selectedUserstore.getState();
  const userId = userInfo._id;

  const userList = state.map((user) => {
    return `<button class="ripple ${
      user._id === userId ? "active" : ""
    }" data-user-id=${user._id}>${user.name}</button>`;
  });
  const userAddButton = `<button class="ripple user-create-button">+ 유저 생성</button>`;
  const userDeleteButton = `<button class="ripple user-delete-button">- 유저 삭제</button>`;
  userList.push(userAddButton, userDeleteButton);

  $userDiv.innerHTML = userList.join("\n");
}
