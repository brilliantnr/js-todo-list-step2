import UserList from "../components/UserList.js";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getSelectedUser,
  selectedUserstore,
  store,
} from "../store/userReducer.js";
import TodoContainer from "./TodoContainer.js";

export default async function UserContainer() {
  const $userDiv = document.getElementById("user-list");

  const onClickAddUser = async (e) => {
    const USERNAME_MIN_LENGTH = 2;
    if (e.target.classList.contains("user-create-button")) {
      const userNameInput = prompt("추가하고 싶은 이름을 입력해주세요.");
      const name = userNameInput.trim();
      if (name.length < USERNAME_MIN_LENGTH) {
        alert(`이름은 최소 ${USERNAME_MIN_LENGTH}글자 이상이어야 합니다.`);
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
      await setSelectedUser(selectedUserId);
      await store.dispatch(deleteUser(selectedUserId));
      await store.dispatch(getAllUsers());
    }
  };

  const onClickSelectUser = (e) => {
    if (e.target.classList.contains("ripple")) {
      const clickedUserId = e.target.dataset.userId;
      setSelectedUser(clickedUserId);
    }
  };

  const setSelectedUser = (userId) => {
    selectedUserstore.dispatch(getSelectedUser(userId));
    render();
  };

  const render = async () => {
    UserList();
    TodoContainer();
  };

  $userDiv.addEventListener("click", onClickAddUser);
  $userDiv.addEventListener("click", onClickDeleteUser);
  $userDiv.addEventListener("click", onClickSelectUser);

  store.subscribe(render);

  render();
}
