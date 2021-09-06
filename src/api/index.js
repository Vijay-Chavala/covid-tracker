import axios from "axios";
const url = "https://covid19.mathdro.id/api";
// fetching confirmed, recovered, deaths, lastUpdate from the api
export const fetchData = async (country) => {
  let countryURL = url;

  if (country) {
    countryURL = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(countryURL);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
  }
};
//fetching dailyData
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};
//fetching countries

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
