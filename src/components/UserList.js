import { store } from "../store/reducer.js";

export default async function userList(userId = "") {
  const userDiv = document.getElementById("user-list");

  const state = await store.getState();

  const userList = state.map((user) => {
    return `<button class="ripple ${
      user._id === userId ? "active" : ""
    }" data-user-id=${user._id}>${user.name}</button>`;
  });
  userDiv.innerHTML = userList.join("\n");
}
