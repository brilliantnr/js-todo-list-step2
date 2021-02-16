import UserContainer from "./containers/UserContainer.js";
import { getAllUsers, store } from "./store/userReducer.js";
const app = async () => {
  await store.dispatch(getAllUsers());
  await UserContainer();
};

app();
