///////////////////////////////////////////////////////////////////////////////////////
//       InitAccount.routes.js: stores all of the extended logic for our routes      //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

import { initAccount } from "../controllers/initAccount.controller.js";

const express = require("express");
const router = express.Router();

router.post("/init-account", initAccount);

export default router;
