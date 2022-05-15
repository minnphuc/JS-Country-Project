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
    const query = this._input.value;
    this._input.value = "";
    return query;
  }
}

export default new SearchView();
