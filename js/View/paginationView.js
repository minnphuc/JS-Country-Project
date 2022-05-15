import View from "./View";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination_view");
  _data;

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination_btn");
      if (!btn) return;

      const goToPage = +btn.dataset.page;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPage = Math.ceil(
      this._data.countries.length / this._data.resultsPerPage
    );

    if (currentPage === 1 && numPage > 1)
      return `
            <span class="page_num">${currentPage}</span>
            ${this._generateMarkupBtn("ford", currentPage)}
            `;

    if (currentPage < numPage)
      return `
            ${this._generateMarkupBtn("back", currentPage)}
            <span class="page_num">${currentPage}</span>
            ${this._generateMarkupBtn("ford", currentPage)}
        `;

    if (currentPage === numPage && numPage > 1)
      return `
            ${this._generateMarkupBtn("back", currentPage)}
            <span class="page_num">${currentPage}</span>
        `;

    return `
            <span class="page_num">${currentPage}</span>
        `;
  }

  _generateMarkupBtn(direction, curPage) {
    const nextPage = curPage + 1;
    const prevPage = curPage - 1;

    return direction === "ford"
      ? `<button class="pagination_btn ford" data-page="${nextPage}">Page ${nextPage} <i class="material-icons">arrow_forward</i></button>`
      : `<button class="pagination_btn back" data-page="${prevPage}"><i class="material-icons">arrow_back</i> Page ${prevPage}</button>`;
  }
}

export default new PaginationView();
