import TodoList from "../components/TodoList.js";
import TodoPriority from "../components/TodoPriority.js";
import { selectedUserstore } from "../store/reducer.js";
import {
  itemStore,
  addItem,
  getItems,
  updateItem,
  updateCompleteToggle,
  deleteItem,
  editMode,
} from "../store/todoreducer.js";

export default async function TodoContainer() {
  const $listUl = document.querySelector(".todo-list");
  const $input = document.querySelector(".new-todo");

  const addTodoItemHandler = async (e) => {
    const content = e.target.value.trim();
    if (e.key === "Enter" && content.length > 0) {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const message = { contents: content };
      itemStore.dispatch(addItem(userId, message));
      $input.value = "";
      render();
    }
  };

  const onEditModeHandler = async (e) => {
    if (e.target.className === "label") {
      const itemId = e.target.closest("li").id;
      itemStore.dispatch(editMode(itemId));
      const todoItems = await itemStore.getState();
      await TodoList({ todoItems });
      await TodoPriority({ selectPriorityHandler });
      onEditHandler();
    }
  };

  const onEditHandler = () => {
    const $editingItem = document.querySelector(".editing");
    if ($editingItem) {
      onFocusEditingInputHandler($editingItem);
      $editingItem.addEventListener("keydown", onKeyDownEventHandler);
    }
  };

  const onKeyDownEventHandler = async (e) => {
    if (e.key === "Escape") {
      render();
      return;
    }
    const editcontent = e.target.value.trim();
    if (e.key === "Enter" && editcontent.length > 0) {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const itemId = e.target.closest("li").id;
      const message = { contents: editcontent };

      itemStore.dispatch(updateItem(userId, itemId, message));
      render();
    }
  };

  const onFocusEditingInputHandler = ($editingItem) => {
    const $editInput = $editingItem.querySelector(".edit");
    $editInput.focus();
    $editInput.setSelectionRange(
      $editInput.value.length,
      $editInput.value.length
    );
  };

  const onCompleteToggleHandler = async (e) => {
    if (e.target.className === "toggle") {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const itemId = e.target.closest("li").id;
      itemStore.dispatch(updateCompleteToggle(userId, itemId));
      render();
    }
  };

  const onDestroyToggleHandler = async (e) => {
    if (e.target.className === "destroy") {
      const userInfo = await selectedUserstore.getState();
      const userId = userInfo._id;
      const itemId = e.target.closest("li").id;
      itemStore.dispatch(deleteItem(userId, itemId));
      render();
    }
  };

  const selectPriorityHandler = (e) => {
    console.log(e);
  };

  const render = async () => {
    const userInfo = await selectedUserstore.getState();
    const userId = userInfo._id;
    if (userId) {
      await itemStore.dispatch(getItems(userId));
      const todoItems = await itemStore.getState();
      await TodoList({ todoItems });
      await TodoPriority({ selectPriorityHandler });
    }
  };

  render();

  $input.addEventListener("keypress", addTodoItemHandler);
  $listUl.addEventListener("click", onCompleteToggleHandler);
  $listUl.addEventListener("click", onDestroyToggleHandler);
  $listUl.addEventListener("dblclick", onEditModeHandler);
}
