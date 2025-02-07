/////////////////////////////////////////////////////////////////////////////////////////////
//    FindMatch.controller.js: this will store all of the function logic for our routes    //
/////////////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const getMatchInfo = async (matchId) => {
  try {
    const matchInfo = await fetchData(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`
    );

    return matchInfo;
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getMatchInfo) An error occurred: ${error.message}` });
  }
};

module.exports = { getMatchInfo };
