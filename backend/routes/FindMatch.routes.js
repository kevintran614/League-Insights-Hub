///////////////////////////////////////////////////////////////////////////////////////
//        FindMatch.routes.js: stores all of the extended logic for our routes       //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { getMatchInfo } = require("../controller/FindMatch.controller.js");

const express = require("express");
const router = express.Router();

router.get("/account-find-match", getMatchInfo);

module.exports = router;
