export default function createStore(initialState = [], reducer) {
  let state = initialState;

  const listeners = [];

  const publish = () => {
    listeners.forEach(({ subscriber }) => {
      subscriber.call();
    });
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    publish();
  };

  const getState = () => [...state];

  const subscribe = (subscriber) => listeners.push(subscriber);

  return {
    dispatch,
    getState,
    subscribe,
  };
}
