///////////////////////////////////////////////////////////////////////////////////////
//        Champions.routes.js: stores all of the extended logic for our routes       //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { champions } = require("../controller/Champions.controller.js");

const express = require("express");
const router = express.Router();

router.post("/account-champions", champions);

module.exports = router;
