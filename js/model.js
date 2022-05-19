import { getJSON } from "./helper";
import { RES_PER_PAGE } from "./config";

export const state = {
  country: {},
  results: {
    // DATABASE
    countries: [],
    queryCountries: [],
    filterCountries: [],
    // PAGINATION
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

//? ----HOME PAGE----

export const loadCountries = async function () {
  try {
    // An array with 250 country
    const data = await getJSON("https://restcountries.com/v3.1/all");

    state.results.countries = data.map(country => {
      return {
        id: country.cca3,
        name: country.name.common,
        population: country.population,
        region: country.region,
        capital: country.capital,
        flagImg: country.flags.png,
      };
    });

    // Handle Errors
  } catch (err) {
    throw err;
  }
};

export const getCountriesPage = function (page = state.results.page) {
  state.results.page = page;

  const start = (page - 1) * state.results.resultsPerPage;
  const end = page * state.results.resultsPerPage;

  return state.results.countries.slice(start, end);
};

//? ----SEARCHES COUNTRIES VIEW----

export const searchCountry = function (query) {
  state.results.page = 1;

  state.results.queryCountries = state.results.countries.filter(country =>
    country.name.toLowerCase().startsWith(query.toLowerCase())
  );
};

//? ----DETAIL COUNTRY VIEW----

const getBorderData = function (borderID) {
  const borderCountry = state.results.countries.find(
    country => country.id === borderID
  );

  return {
    borderID: borderCountry.id,
    borderName: borderCountry.name,
  };
};

export const loadDetailCountry = async function (id) {
  try {
    const data = await getJSON(`https://restcountries.com/v3.1/alpha/${id}`);

    const [countryData] = data;

    state.country = {
      id: countryData.cca3,
      flagImg: countryData.flags.svg,
      name: countryData.name.common,
      nativeName: Object.values(countryData.name.nativeName)[0].common,
      population: countryData.population,
      region: countryData.region,
      subRegion: countryData.subregion,
      capital: countryData.capital[0],
      topLevelDomain: countryData.tld[0],
      currencies: Object.values(countryData.currencies)[0].name,
      languages: Object.values(countryData.languages),
      borders: countryData.borders
        ? countryData.borders.map(getBorderData)
        : [],
    };

    console.log(state.country);
    // Handle Errors
  } catch (err) {
    console.error(err);
  }
};

//? ----FILTER COUNTRIES----

export const filterCountries = function (region) {
  state.results.page = 1;

  state.results.filterCountries = state.results.countries.filter(
    country => country.region === region
  );
};
