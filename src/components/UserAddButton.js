export default function userAddButton() {
  const userDiv = document.getElementById("user-list");
  const btnTemplete = `<button class="ripple user-create-button">+ 유저 생성</button>`;
  userDiv.insertAdjacentHTML("beforeend", btnTemplete);
}
