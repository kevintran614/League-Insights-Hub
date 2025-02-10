///////////////////////////////////////////////////////////////////////////////////////
//   DisplayAccount.controller.js: stores all of the extended logic for our routes   //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");
const pool = require("../config/Database.js");

const { getChampions } = require("../controller/Champions.controller.js");
const {
  getLeagueEntries,
} = require("../controller/LeagueEntries.controller.js");
const { getTotalMastery } = require("../controller/TotalMastery.controller.js");
const { getMatches } = require("../controller/Matches.controller.js");
const { getMatchInfo } = require("../controller/FindMatch.controller.js");

const displayAccount = async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    if (!gameName || !tagLine) {
      return res.status(500).json({
        error: `(displayAccount) An error occurred: ${error.message}`,
      });
    }

    const queryStartTime = Date.now();

    console.log(`Starting qeury for ${gameName} #${tagLine}`);

    const checkAccountData = await pool.query(
      "SELECT * FROM summonerData WHERE summonerName = ($1) AND summonerTagline = ($2)",
      [gameName, tagLine]
    );

    if (checkAccountData.rows.length > 0) {
      const queryEndTime = Date.now();
      console.log(
        `Found ${gameName} #${tagLine} in cache, query took ${
          queryEndTime - queryStartTime
        }ms`
      );
      return res.status(200).json(checkAccountData.rows[0].summonermetadata);
    }

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

    const queryEndTime = Date.now();
    console.log(
      `Finishing query for ${gameName} #${tagLine}, query took ${
        queryEndTime - queryStartTime
      }ms`
    );

    await pool.query(
      "INSERT INTO summonerData (summonerName, summonerTagline, summonerMetaData) VALUES($1, $2, $3) RETURNING *",
      [gameName, tagLine, JSON.stringify(account)]
    );

    res.json(account);
  } catch (error) {
    res
      .status(500)
      .json({ error: `(displayAccount) An error occurred: ${error.message}` });
  }
};

module.exports = { displayAccount };
