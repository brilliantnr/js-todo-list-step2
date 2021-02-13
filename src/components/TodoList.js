import { FilterType, ProgressType, PriorityType } from "../constants/Types.js";

const TodoList = async ({ todoItems, selectedFiter = FilterType.ALL }) => {
  const $listUl = document.querySelector(".todo-list");

  const showItems = todoItems;

  const render = () => {
    if (showItems) {
      const itemList = showItems.map((obj) => {
        return `
        <li id="${obj._id}" class="${
          obj.isCompleted
            ? ProgressType.COMPLETED
            : obj.editFlag
            ? ProgressType.EDITING
            : ""
        }">
          <div class="view">
            <input class="toggle" type="checkbox" ${
              obj.isCompleted ? "checked" : ""
            } />
            <label class="label">
              ${
                obj.isCompleted
                  ? ""
                  : obj.priority === PriorityType.NONE
                  ? `
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`
                  : obj.priority === PriorityType.FIRST
                  ? `<span class="chip primary">1순위</span>`
                  : obj.priority === PriorityType.SECOND
                  ? `<span class="chip secondary">2순위</span>`
                  : ""
              }
              ${obj.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value=${obj.contents} />
      </li>`;
      });
      $listUl.innerHTML = itemList.join("");
    }
  };

  await render();
};

export default TodoList;
