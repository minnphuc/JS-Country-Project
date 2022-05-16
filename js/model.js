import { getJSON } from "./helper";
import { RES_PER_PAGE } from "./config";

export const state = {
  country: {},
  bordersCountry: [],
  results: {
    // DATABASE
    countries: [],
    queryCountries: [],
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
    console.error(err);
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

export const loadDetailCountry = async function (id) {
  try {
    let countryData;

    //? 1. Check if we already have countryData in bordersCountry

    if (state.bordersCountry.some(country => country.cca3 === id)) {
      const index = state.bordersCountry.findIndex(
        country => country.cca3 === id
      );

      countryData = state.bordersCountry[index];

      state.bordersCountry = [];
    } else {
      const data = await getJSON(`https://restcountries.com/v3.1/alpha/${id}`);

      [countryData] = data;

      state.bordersCountry = [];
    }

    //? 2. Fetching border country from countryData

    if (countryData.borders) {
      for (const border of countryData.borders) {
        const borderCountry = await getJSON(
          `https://restcountries.com/v3.1/alpha/${border}`
        );
        state.bordersCountry.push(borderCountry[0]);
      }
    }

    console.log(state.bordersCountry);

    //? 3. Format countryData
    state.country = {
      id: countryData.cca3,
      flagImg: countryData.flags.png,
      name: countryData.name.common,
      nativeName: Object.values(countryData.name.nativeName)[0].common,
      population: countryData.population,
      region: countryData.region,
      subRegion: countryData.subregion,
      capital: countryData.capital[0],
      topLevelDomain: countryData.tld[0],
      currencies: Object.values(countryData.currencies)[0].name,
      languages: Object.values(countryData.languages),
      borders: state.bordersCountry.map(country => {
        return {
          borderID: country.cca3,
          borderName: country.name.common,
        };
      }),
    };

    console.log(state.country);

    // Handle Errors
  } catch (err) {
    console.error(err);
  }
};
