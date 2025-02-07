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

const displayAccount = async (req, res) => {
  try {
    const account = req.account;

    console.log(account);
    console.log("alison 1");

    const champions = await getChampions(req);
    console.log("alison 2");

    const leagueEntries = await getLeagueEntries(req);
    console.log("alison 3");

    account.champions = champions;
    account.leagueEntries = leagueEntries;

    res.json(account);
  } catch (error) {
    res
      .status(500)
      .json({ error: `(displayAccount) An error occurred: ${error.message}` });
  }
};

module.exports = { displayAccount };
