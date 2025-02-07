///////////////////////////////////////////////////////////////////////////////////////
//          Matches.routes.js: stores all of the extended logic for our routes       //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { getMatches } = require("../controller/Matches.controller.js");

const express = require("express");
const router = express.Router();

router.get("/account-matches", getMatches);

module.exports = router;
