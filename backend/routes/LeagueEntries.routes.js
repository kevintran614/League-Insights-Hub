///////////////////////////////////////////////////////////////////////////////////////
//     LeagueEntries.routes.js: stores all of the extended logic for our routes      //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const {
  getLeagueEntries,
} = require("../controller/LeagueEntries.controller.js");

const express = require("express");
const router = express.Router();

router.get("/account-league-entries", getLeagueEntries);

module.exports = router;
