class CountriesView {
  _parentElement = document.querySelector(".country_view");
  _data;

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
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
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRenderCountries(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountryCard).join("\n");
  }

  _generateMarkupCountryCard(country) {
    return `
    <div class="country_card">
      <a class="card_link" href="#${country.id}">
          <div class="card_img">
              <img src="${country.flagImg}" alt="flag">
          </div>
  
          <p class="card_name">${country.name}</p>
  
          <p class="card_detail">Population: <span>${country.population}</span></p>
          <p class="card_detail">Region: <span>${country.region}</span></p>
          <p class="card_detail">Capital: <span>${country.capital}</span></p>
      </a>
    </div>
    `;
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}

export default new CountriesView();
