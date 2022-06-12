import * as model from "./model.js";
import countriesView from "./View/countriesView";
import searchView from "./View/searchView.js";
import paginationView from "./View/paginationView.js";
import countryView from "./View/countryView.js";
import themeView from "./View/themeView.js";

// Polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

// API Doc: https://restcountries.com

const renderHomePage = function () {
  countriesView.render(model.getCountriesPage());
  paginationView.render(model.state.results);
  searchView.resetFilterBox();
  searchView.renderTotalCountries(model.state.results.countries);
};

//? ----CONTROLLER----

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
    countriesView.renderError(err);
  }
};

const controlPagination = function (goToPage) {
  //? 0. Handling UI
  paginationView.clear();
  countriesView.renderSpinner();

  setTimeout(function () {
    //? 1. Change current page in state and render NEW page
    countriesView.render(model.getCountriesPage(goToPage));

    //? 2. Render NEW pagination button
    paginationView.render(model.state.results);
  }, 200);
};

const controlSearch = function () {
  //? 1. Render spinner
  paginationView.clear();
  countriesView.renderSpinner();

  //? 2. Get query value from search bar
  const query = searchView.getQuery();

  // If query === empty string -> Return to home page
  if (!query) {
    renderHomePage();
    return;
  }

  //? 3. Search for country from state
  model.searchCountry(query);

  //? 4. Render to view

  if (model.state.results.queryCountries.length === 0) {
    countriesView.renderError();
    return;
  }

  countriesView.render(model.state.results.queryCountries);
  searchView.renderTotalCountries(model.state.results.queryCountries);
};

const controlCountryDetail = async function () {
  try {
    //? 0. Handling UI
    searchView.hide();
    countriesView.hide();
    paginationView.hide();

    countryView.display();
    countryView.renderSpinner(61);

    //? 1. Take ID from url to fetch API
    const id = window.location.hash.slice(1);
    if (!id) return;

    //? 2. Load country data
    await model.loadDetailCountry(id);

    //? 3. Render data to view
    countryView.render(model.state.country);
  } catch (err) {
    console.error(err);
  }
};

const controlFilterCountries = function () {
  paginationView.clear();
  countriesView.renderSpinner();

  //? 1. Get region
  const region = searchView.getFilterValue();

  //? 2. Filter base on region
  model.filterCountries(region);

  //? 3. Render to view

  if (model.state.results.filterCountries.length === 0) {
    renderHomePage();
    return;
  }

  countriesView.render(model.state.results.filterCountries);
  searchView.renderTotalCountries(model.state.results.filterCountries);
};

const controlBackToHomepage = function () {
  //? 0. Handling UI
  countryView.hide();
  searchView.display();
  countriesView.display();
  paginationView.display();
  countriesView.renderSpinner();

  //? 1. Render to view
  renderHomePage();
};

//? ----INITIAL----

const init = function () {
  countriesView.addHandlerLoad(controlCountries);
  searchView.addHandlerSubmit(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  countryView.addHandlerRender(controlCountryDetail);
  countryView.addHandlerClick(controlBackToHomepage);
  searchView.addHandlerChange(controlFilterCountries);
};

init();
