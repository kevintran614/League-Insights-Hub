///////////////////////////////////////////////////////////////////////////////////////
//     LeagueEntries.routes.js: stores all of the extended logic for our routes      //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { leagueEntries } = require("../controller/LeagueEntries.controller.js");

const express = require("express");
const router = express.Router();

router.post("/account-league-entries", leagueEntries);

module.exports = router;
