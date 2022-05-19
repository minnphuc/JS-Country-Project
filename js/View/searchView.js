import View from "./View";

class SearchView extends View {
  _parentElement = document.querySelector(".search_view");
  _input = document.querySelector(".search_input");
  _filterBox = document.querySelector("#filter");

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerChange(handler) {
    this._filterBox.addEventListener("change", handler);
  }

  getFilterValue() {
    return this._filterBox.value;
  }

  resetFilterBox() {
    this._filterBox.value = "null";
  }

  getQuery() {
    const query = this._input.value;
    this._input.value = "";
    return query;
  }
}

export default new SearchView();
