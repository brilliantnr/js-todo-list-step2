const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/";

export default function api(method, uri) {
  const option = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(body),
  };

  return fetch(`${BASE_URL}${uri}`, option)
    .then((data) => {
      if (!data.ok) {
        throw new Error(data.status);
      }
      return data.json();
    })
    .then((post) => {
      console.log(post);
      return post;
    })
    .catch((error) => {
      console.log(error);
    });
}
