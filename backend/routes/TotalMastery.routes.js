///////////////////////////////////////////////////////////////////////////////////////
//       TotalMastery.routes.js: stores all of the extended logic for our routes     //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { getTotalMastery } = require("../controller/TotalMastery.controller.js");

const express = require("express");
const router = express.Router();

router.get("/account-total-mastery", getTotalMastery);

module.exports = router;
