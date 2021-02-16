const TodoTitle = ({ userName }) => {
  const $userTitle = document.querySelector("#user-title");

  async function render() {
    let title =
      userName === ""
        ? `<span>Todo List</span>`
        : `<span><strong>${userName}</strong>'s Todo List</span>`;
    $userTitle.innerHTML = title;
  }

  render();
};

export default TodoTitle;
