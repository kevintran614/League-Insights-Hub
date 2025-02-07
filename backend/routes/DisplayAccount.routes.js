///////////////////////////////////////////////////////////////////////////////////////
//      DisplayAccount.routes.js: stores all of the extended logic for our routes    //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const {
  displayAccount,
} = require("../controller/DisplayAccount.controller.js");

const initAccount = require("../middleware/InitAccount.js");

const express = require("express");
const router = express.Router();

router.post("/display-account", initAccount, displayAccount);

module.exports = router;
