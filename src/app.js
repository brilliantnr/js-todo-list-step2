// import TodoContainer from "./containers/todoContainer.js";
import UserContainer from "./containers/UserContainer.js";
import { getAllUsers, store } from "./store/reducer.js";
const app = async () => {
  await store.dispatch(getAllUsers());
  await UserContainer();
};

app();
