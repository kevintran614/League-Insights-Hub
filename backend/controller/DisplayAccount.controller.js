///////////////////////////////////////////////////////////////////////////////////////
//   DisplayAccount.controller.js: stores all of the extended logic for our routes   //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const { getChampions } = require("../controller/Champions.controller.js");
const {
  getLeagueEntries,
} = require("../controller/LeagueEntries.controller.js");
const { getTotalMastery } = require("../controller/TotalMastery.controller.js");
const { getMatches } = require("../controller/Matches.controller.js");
const { getMatchInfo } = require("../controller/FindMatch.controller.js");

const displayAccount = async (req, res) => {
  try {
    const account = req.account;

    const champions = await getChampions(req);
    const leagueEntries = await getLeagueEntries(req);
    const totalMastery = await getTotalMastery(req);
    const matches = await getMatches(req);

    account.champions = champions;
    account.leagueEntries = leagueEntries;
    account.totalMastery = totalMastery;
    account.matches = matches;

    let matchInfos = {};

    for (let i = 0; i < account.matches.length; i++) {
      let matchInfo = await getMatchInfo(account.matches[i], account.puuid);
      matchInfos[matches[i]] = matchInfo;
    }

    account.matchInfos = matchInfos;

    res.json(account);
  } catch (error) {
    res
      .status(500)
      .json({ error: `(displayAccount) An error occurred: ${error.message}` });
  }
};

module.exports = { displayAccount };
