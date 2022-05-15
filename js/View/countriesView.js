import View from "./View";

class CountriesView extends View {
  _parentElement = document.querySelector(".country_view");
  _data;

  addHandlerRenderCountries(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupCountryCard).join("\n");
  }

  _generateMarkupCountryCard(country) {
    const population = new Intl.NumberFormat("en-US").format(
      country.population
    );

    return `
    <div class="country_card">
      <a class="card_link" href="#${country.id}">
          <div class="card_img">
              <img src="${country.flagImg}" alt="flag">
          </div>
  
          <p class="card_name">${country.name}</p>
  
          <p class="card_detail">Population: <span>${population}</span></p>
          <p class="card_detail">Region: <span>${country.region}</span></p>
          <p class="card_detail">Capital: <span>${country.capital}</span></p>
      </a>
    </div>
    `;
  }
}

export default new CountriesView();
