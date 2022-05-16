import View from "./View";

class CountryView extends View {
  _parentElement = document.querySelector(".detail_view");
  _data;

  _generateMarkup() {
    return `
      <div class="back_btn"><i class="material-icons" style="margin-right: 1rem;">arrow_back</i>Back</div>

      <div class="detail_img">
          <img src="${this._data.flagImg}" alt="flag">
      </div>

      <p class="detail_name">${this._data.name}</p>

      <div class="detail_content">
          <p class="detail">Native Name: <span>${
            this._data.nativeName
          }</span></p>
          <p class="detail">Population: <span>${
            this._data.population
          }</span></p>
          <p class="detail">Region: <span>${this._data.region}</span></p>
          <p class="detail">Sub Region: <span>${this._data.subRegion}</span></p>
          <p class="detail">Capital: <span>${this._data.capital}</span></p>
          <p class="detail">Top Level Domain: <span>${
            this._data.topLevelDomain
          }</span></p>
          <p class="detail">Currencies: <span>${
            this._data.currencies
          }</span></p>
          <p class="detail">Languages: <span>${this._data.languages.join(
            ","
          )}</span></p>
      </div>

      <div class="border">
          <p class="detail_border">Border Countries:</p>
          ${this._data.borders.map(this._generateMarkupBorder)}
      </div>
    `;
  }

  _generateMarkupBorder(border) {
    return `
        <a href="#${border.borderID}"><button class="border_btn">${border.borderName}</button></a>
      `;
  }
}

export default new CountryView();
