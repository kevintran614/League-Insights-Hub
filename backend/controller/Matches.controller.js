/////////////////////////////////////////////////////////////////////////////////////////////
//      Matches.controller.js: this will store all of the function logic for our routes    //
/////////////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const getMatches = async (req, res) => {
  try {
    const { puuid } = req.account;

    const champions = await fetchData(
      `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${api_key}`
    );

    return champions;
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getChampions) An error occurred: ${error.message}` });
  }
};

module.exports = { getMatches };
