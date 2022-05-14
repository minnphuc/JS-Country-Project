import * as model from "./model.js";
import countriesView from "./View/countriesView";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// API Doc: https://restcountries.com

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlCountries = async function () {
  try {
    countriesView.renderSpinner();

    await model.loadCountries();

    countriesView.render(model.state.results.countries);

    // Handle Errors
  } catch (err) {
    console.error(err);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const init = function () {
  countriesView.addHandlerRenderCountries(controlCountries);
};

init();
