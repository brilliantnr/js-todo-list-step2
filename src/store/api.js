import { GET, POST, PUT } from "../constants/HttpMethod.js";

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

const api = async (method, url, message) =>
  await fetch(url, option(method, message))
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .catch((error) => {
      console.log(error);
    });

export const repository = {
  getAllUsers: () => api(GET, `${BASE_URL}/users`),
  addUser: (message) => api(POST, `${BASE_URL}/users`, message),
};
