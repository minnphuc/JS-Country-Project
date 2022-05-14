import * as model from "./model.js";
import countriesView from "./View/countriesView";
import searchView from "./View/searchView.js";
import themeView from "./View/themeView.js";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// API Doc: https://restcountries.com

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlCountries = async function () {
  try {
    //? 1. Render spinner
    countriesView.renderSpinner();

    //? 2. Load all country from API
    await model.loadCountries();

    //? 3. Render to view
    countriesView.render(model.state.results.countries);

    // Handle Errors
  } catch (err) {
    console.error(err);
  }
};

const controlSearch = function () {
  //? 1. Render spinner
  countriesView.renderSpinner();

  //? 2. Get query value from search bar
  const query = searchView.getQuery();

  //? 3. Search for country from state
  model.searchCountry(query);

  //? 4. Render to view after 1sec to simulate loading
  setTimeout(function () {
    countriesView.render(model.state.results.queryCountry);
  }, 1000);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const init = function () {
  countriesView.addHandlerRenderCountries(controlCountries);
  searchView.addHandlerQuery(controlSearch);
};

init();
