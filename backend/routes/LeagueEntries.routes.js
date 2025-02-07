///////////////////////////////////////////////////////////////////////////////////////
//     LeagueEntries.routes.js: stores all of the extended logic for our routes      //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

import { leagueEntries } from "../controllers/LeagueEntries.controller.js";

const express = require("express");
const router = express.Router();

router.post("/account-league-entries", leagueEntries);

export default router;
