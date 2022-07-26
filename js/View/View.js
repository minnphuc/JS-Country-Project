export default class View {
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner(rightMargin = 72) {
    const markup = `
    <div class="sk-chase sk-center" style="position: absolute; right: ${rightMargin}rem;">
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

  renderError(msg = this._errorMsg) {
    const markup = `
      <div class="error_msg">
        <span>
          <i class="material-icons">warning</i>
          ${msg}
        </span>
      </div>
    `;
    this.clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  display() {
    this._parentElement.classList.remove("hidden");
  }

  hide() {
    this._parentElement.classList.add("hidden");
  }

  clear() {
    this._parentElement.innerHTML = "";
  }
}
