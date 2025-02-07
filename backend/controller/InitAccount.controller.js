///////////////////////////////////////////////////////////////////////////////////////
//   InitAccount.controller.js: this will store all of the function logic for our routes    //
///////////////////////////////////////////////////////////////////////////////////////

const account = require("../models/Account.js");
const fetchData = require("../utils/FetchData.js");

export const initAccount = async (gameName, tagLine) => {
  try {
    const accountData = await fetchData(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`
    );
    const puuid = accountData.puuid;

    const summonerData = await fetchData(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
    );

    return new account(gameName, tagLine, puuid, summonerData);
  } catch (error) {
    res
      .status(500)
      .json({ error: `(InitAccount) An error occurred: ${error.message}` });
  }
};

module.exports = { initAccount };
