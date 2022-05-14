class ThemeView {
  _parentElement = document.querySelector("body");
  _modeBtn = document.querySelector(".mode");

  constructor() {
    this._addHandlerBtn();
  }

  _addHandlerBtn() {
    this._modeBtn.addEventListener("click", this._themeSwitch.bind(this));
  }

  _themeSwitch() {
    if (this._parentElement.classList.contains("light")) {
      this._parentElement.classList.add("dark");
      this._parentElement.classList.remove("light");
    } else {
      this._parentElement.classList.add("light");
      this._parentElement.classList.remove("dark");
    }
  }
}

export default new ThemeView();
