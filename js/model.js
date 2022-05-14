import { RES_PER_PAGE } from "./config";

export const state = {
  results: {
    countries: [],
    queryCountry: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadCountries = async function () {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    // An array with 250 country
    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error("Something went wrong 💥💥💥");

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

export const getCountriesPage = function (page) {
  const start = (page - 1) * state.resultsPerPage;
  const end = page * state.resultsPerPage;
  ``;

  return state.results.countries.slice(start, end);
};

export const searchCountry = function (query) {
  state.results.queryCountry = state.results.countries.filter(country =>
    country.name.toLowerCase().startsWith(query.toLowerCase())
  );
};
