import View from "./View";

class SearchView extends View {
  _parentElement = document.querySelector(".search_view");
  _input = document.querySelector(".search_input");
  _filterBox = document.querySelector("#filter");
  _totalCountries = document.querySelector(".total");

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerChange(handler) {
    this._filterBox.addEventListener("change", handler);
  }

  renderTotalCountries(data) {
    this._totalCountries.innerHTML = `Total countries: ${data.length}`;
  }

  getFilterValue() {
    return this._filterBox.value;
  }

  getQuery() {
    const query = this._input.value;
    this._input.value = "";
    return query;
  }

  resetFilterBox() {
    this._filterBox.value = "null";
  }
}

export default new SearchView();
