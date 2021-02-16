import { FilterType } from "../constants/Types.js";
import createStore from "./store.js";

export const CHANGE_FILTER = "CHANGE_FILTER";

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  filter: filter,
});

const filterState = { filter: FilterType.ALL };

async function filterReducer(state = filterState, action) {
  switch (action.type) {
    case CHANGE_FILTER:
      const newState = { ...state };
      newState.filter = action.filter;
      return newState;

    default:
      return state;
  }
}
export const filterStore = createStore(filterState, filterReducer);
