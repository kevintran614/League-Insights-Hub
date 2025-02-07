///////////////////////////////////////////////////////////////////////////////////////
//   InitAccount.controller.js: this will store all of the function logic for our routes    //
///////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("config/Config.js");

export const getLeagueEntries = async (encryptedSummonerId) => {
  try {
    const leagueEntries = await fetchData(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${api_key}`
    );

    return leagueEntries;
  } catch (error) {
    res.status(500).json({
      error: `(getLeagueEntries) An error occurred: ${error.message}`,
    });
  }
};

module.exports = { getLeagueEntries };
