/////////////////////////////////////////////////////////////////////////////////////////////
//    Champions.controller.js: this will store all of the function logic for our routes    //
/////////////////////////////////////////////////////////////////////////////////////////////

const account = require("../model/Account.js");
const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const getChampions = async (puuid) => {
  try {
    const champions = await fetchData(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${api_key}`
    );

    return champions;
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getChampions) An error occurred: ${error.message}` });
  }
};

module.exports = { getChampions };
