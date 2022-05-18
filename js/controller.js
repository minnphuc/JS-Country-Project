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
    countriesView.renderError(20, err);
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
  }, 400);
};

const controlSearch = function () {
  //? 1. Render spinner
  paginationView.clear();
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
    if (model.state.results.queryCountries.length === 0) {
      countriesView.renderError(32);
      return;
    }

    countriesView.render(model.state.results.queryCountries);
  }, 1000);
};

const controlCountryDetail = async function () {
  try {
    //? 0. Handling UI
    searchView.hide();
    countriesView.clear();
    paginationView.clear();

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

const controlBackToHomepage = function () {
  //? 0. Handling UI
  searchView.display();
  countryView.hide();
  countriesView.renderSpinner();

  //? 1. Render to view
  setTimeout(renderHomePage, 800);
};

//? ----INITIAL----

const init = function () {
  countriesView.addHandlerLoad(controlCountries);
  searchView.addHandlerSubmit(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  countryView.addHandlerRender(controlCountryDetail);
  countryView.addHandlerClick(controlBackToHomepage);
};

init();
