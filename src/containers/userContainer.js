import userList from "../components/UserList.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getSelectedUser,
  selectedUserstore,
  store,
} from "../store/reducer.js";
import TodoContainer from "./todoContainer.js";

export default async function UserContainer() {
  const $userDiv = document.getElementById("user-list");

  await store.dispatch(getAllUsers());

  const onClickAddUser = async (e) => {
    if (e.target.classList.contains("user-create-button")) {
      const userNameInput = prompt("추가하고 싶은 이름을 입력해주세요.");
      const name = userNameInput.trim();
      if (name.length < 2) {
        alert("이름은 최소 2글자 이상이어야 합니다.");
        return;
      }
      await store.dispatch(addUser(name));
    }
  };

  const onClickDeleteUser = async (e) => {
    if (e.target.classList.contains("user-delete-button")) {
      const deleteConfirm = confirm("정말로 삭제하시겠습니까?");
      if (!deleteConfirm) {
        return;
      }

      const selectedUserInfo = await selectedUserstore.getState();
      const selectedUserId = selectedUserInfo._id;
      await store.dispatch(deleteUser(selectedUserId));
      await store.dispatch(getAllUsers());
    }
  };

  const onClickSelectUser = (e) => {
    const clickedUserId = e.target.dataset.userId;
    if (clickedUserId) {
      selectedUserstore.dispatch(getSelectedUser(clickedUserId));
    }
  };

  const render = () => {
    userList();
    TodoContainer();
  };

  $userDiv.addEventListener("click", onClickAddUser);
  $userDiv.addEventListener("click", onClickDeleteUser);
  $userDiv.addEventListener("click", onClickSelectUser);

  store.subscribe(render);
  selectedUserstore.subscribe(render);

  render();
}
