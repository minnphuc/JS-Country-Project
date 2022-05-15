import * as model from "./model.js";
import countriesView from "./View/countriesView";
import searchView from "./View/searchView.js";
import paginationView from "./View/paginationView.js";
import themeView from "./View/themeView.js";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// API Doc: https://restcountries.com

const renderHomePage = function () {
  countriesView.render(model.getCountriesPage());
  paginationView.render(model.state.results);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const controlCountries = async function () {
  try {
    //? 1. Render spinner
    countriesView.renderSpinner();

    //? 2. Load all country from API
    await model.loadCountries();

    //? 3. Render countries and pagination to view
    renderHomePage();

    // Handle Errors
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  countriesView.renderSpinner();

  setTimeout(function () {
    //? 1. Change current page in state and render NEW countries
    countriesView.render(model.getCountriesPage(goToPage));

    //? 2. Render NEW pagination button
    paginationView.render(model.state.results);
  }, 400);
};

const controlSearch = function () {
  //? 1. Render spinner
  countriesView.renderSpinner();

  //? 2. Get query value from search bar
  const query = searchView.getQuery();

  // If query === empty string -> Return to home page
  if (!query) {
    setTimeout(renderHomePage, 1000);
    return;
  }

  //? 3. Search for country from state
  model.searchCountry(query);

  //? 4. Render to view after 1sec
  setTimeout(function () {
    countriesView.render(model.state.results.queryCountries);
    paginationView.clear();
  }, 1000);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const init = function () {
  countriesView.addHandlerRenderCountries(controlCountries);
  searchView.addHandlerQuery(controlSearch);
  paginationView.addHandlerClick(controlPagination);
};

init();
