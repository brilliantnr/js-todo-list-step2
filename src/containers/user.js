export default async function user(store) {
  const userDiv = document.getElementById("user-list");
  const userCreateButton = document.querySelector(".user-create-button");

  const state = await store.getState();

  const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
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

  const appendUserList = (userId = "") => {
    const userList = state.map((user) => {
      return `<button class="ripple ${
        user._id === userId ? "active" : ""
      }" data-user-id=${user._id}>${user.name}</button>`;
    });
    userDiv.innerHTML = userList.join("\n");
  };

  const appendAddUserButton = () => {
    const btnTemplete = `<button class="ripple user-create-button">+ 유저 생성</button>`;
    userDiv.insertAdjacentHTML("beforeend", btnTemplete);
  };

  const render = (userId = "") => {
    appendUserList(userId);
    appendAddUserButton();
  };

  onClickUser();
  render();
}
