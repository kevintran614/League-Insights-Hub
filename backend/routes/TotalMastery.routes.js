///////////////////////////////////////////////////////////////////////////////////////
//       TotalMastery.routes.js: stores all of the extended logic for our routes     //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

import { totalMastery } from "../controllers/TotalMastery.controller.js";

const express = require("express");
const router = express.Router();

router.post("/account-total-mastery", totalMastery);

export default router;
