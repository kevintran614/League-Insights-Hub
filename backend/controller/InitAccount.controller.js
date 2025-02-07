/////////////////////////////////////////////////////////////////////////////////////////////
//   InitAccount.controller.js: this will store all of the function logic for our routes   //
/////////////////////////////////////////////////////////////////////////////////////////////

const Account = require("../model/Account.js");
const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const initAccount = async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    const accountData = await fetchData(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`
    );
    const puuid = accountData.puuid;

    const summonerData = await fetchData(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
    );

    const account = new Account(gameName, tagLine, puuid, summonerData);

    res.json(account);
  } catch (error) {
    res
      .status(500)
      .json({ error: `(InitAccount) An error occurred: ${error.message}` });
  }
};

module.exports = { initAccount };
