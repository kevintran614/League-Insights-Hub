///////////////////////////////////////////////////////////////////////////////////////
//          InitAccount.routes.js: stores all of the extended logic for our routes          //
//              this way, we don't have to store everything in server.js             //
///////////////////////////////////////////////////////////////////////////////////////

import { champions } from "../controllers/Champions.controller.js";

const express = require("express");
const app = express();
const cors = require("cors");
const { api_key } = require("config/Config.js");
const pool = require("./db");

const port = 5001;

app.use(express.json());
app.use(cors());

app.post("/Champions", champions);

export default app;
