export default class View {
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const markup = `
    <div class="sk-chase sk-center" style="position: relative; right: 6rem;">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
    </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
