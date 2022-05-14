class SearchView {
  _parentElement = document.querySelector(".search_view");
  _input = document.querySelector(".search_input");

  addHandlerQuery(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  getQuery() {
    return this._input.value;
  }
}

export default new SearchView();
