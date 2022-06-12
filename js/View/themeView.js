class ThemeView {
  _parentElement = document.querySelector("body");
  _modeBtn = document.querySelector(".mode");

  constructor() {
    this._initTheme();
    this._addHandlerBtn();
  }

  _addHandlerBtn() {
    this._modeBtn.addEventListener("click", this._themeSwitch.bind(this));
  }

  _themeSwitch() {
    if (this._parentElement.classList.contains("light")) {
      this._parentElement.classList.add("dark");
      this._parentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      this._parentElement.classList.add("light");
      this._parentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  _initTheme() {
    const theme = localStorage.getItem("theme");
    this._parentElement.classList.replace("light", theme);
  }
}

export default new ThemeView();
