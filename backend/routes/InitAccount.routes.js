///////////////////////////////////////////////////////////////////////////////////////
//       InitAccount.routes.js: stores all of the extended logic for our routes      //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

const { initAccount } = require("../controller/InitAccount.controller.js");

const express = require("express");
const router = express.Router();

router.post("/init-account", initAccount);

module.exports = router;
