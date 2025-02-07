///////////////////////////////////////////////////////////////////////////////////////
//        Champions.routes.js: stores all of the extended logic for our routes       //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

import { champions } from "../controllers/Champions.controller.js";

const express = require("express");
const router = express.Router();

router.post("/account-champions", champions);

export default router;
