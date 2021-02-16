import { FilterType } from "../constants/Types.js";
import { filterStore } from "../store/filterReducer.js";

const TodoFilter = () => {
  const $filtersUl = document.querySelector(".filters");

  const filters = [
    { text: "전체보기", hash: "#", type: FilterType.ALL },
    { text: "해야할 일", hash: "#active", type: FilterType.ACTIVE },
    { text: "완료한 일", hash: "#completed", type: FilterType.COMPLETED },
  ];

  async function render() {
    const { filter } = await filterStore.getState();
    const filterList = filters.map((filterContent) => {
      return `
			<li>
				<a class="${filterContent.type} ${
        filterContent.type === filter ? "selected" : ""
      }" 
					href="${filterContent.hash}"
				>
					${filterContent.text}
				</a>
			</li>`;
    });
    $filtersUl.innerHTML = filterList.join("");
  }

  render();
};

export default TodoFilter;
