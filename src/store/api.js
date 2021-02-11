import { GET, POST, PUT, DELETE } from "../constants/HttpMethod.js";

const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";

const option = (method, message = {}) => {
  return Object.values(message).length > 0
    ? {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      }
    : {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
};

const api = async (method, url, message) => {
  return await fetch(url, option(method, message))
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const repository = {
  getAllUsers: () => api(GET, `${BASE_URL}/users`),
  addUser: (message) => api(POST, `${BASE_URL}/users`, message),
  deleteUser: (userId) => api(DELETE, `${BASE_URL}/users/${userId}`),

  getItems: ({ userId }) => api(GET, `${BASE_URL}/users/${userId}/items`),
  addItem: ({ userId, message }) => {
    api(POST, `${BASE_URL}/users/${userId}/items`, message);
  },
  deleteAllItems: ({ userId }) =>
    api(DELETE, `${BASE_URL}/users/${userId}/items`),
  deleteItem: ({ userId, itemId }) =>
    api(DELETE, `${BASE_URL}/users/${userId}/items/${itemId}`),
  updateItem: ({ userId, itemId, message }) =>
    api(PUT, `${BASE_URL}/users/${userId}/items/${itemId}`, message),

  updatePriority: () => api(GET, `${BASE_URL}/users`),
  updateCompleteToggle: ({ userId, itemId }) =>
    api(PUT, `${BASE_URL}/users/${userId}/items/${itemId}`),
};
