import user from "./containers/userContainer.js";
import { getAllUsers, store } from "./store/reducer.js";

const app = async () => {
  await store.dispatch(getAllUsers());
  await user(store);
};

app();
