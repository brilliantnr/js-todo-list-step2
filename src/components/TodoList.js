import { FilterType, ProgressType } from "../constants/Types.js";
import { selectedUserstore } from "../store/reducer.js";

const todoList = async (selectedFiter = FilterType.ALL) => {
  const $listUl = document.querySelector(".todo-list");
  const userInfo = await selectedUserstore.getState();
  const showItems = userInfo.todoList;

  const render = () => {
    const itemList = showItems.map((obj) => {
      return `
    <li id="${obj._id}" class="${
        obj.isCompleted === false
          ? obj.editFlag === false
            ? ""
            : ProgressType.EDITING
          : ProgressType.COMPLETED
      }">
      <div class="view">
        <input class="toggle" type="checkbox" ${
          obj.isCompleted === true ? "checked" : ""
        }/>
        <label class="label">${obj.contents}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value=${obj.contents} />
    </li>`;
    });
    $listUl.innerHTML = itemList.join("");
  };

  await render();
};

export default todoList;
