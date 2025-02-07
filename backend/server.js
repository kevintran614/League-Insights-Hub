const express = require("express");
const app = express();
const cors = require("cors");
const { api_key } = require("./config.js");
const pool = require("./db");

import initAccountRoutes from "./routes/InitAccount.routes.js";
import leagueEntriesRoutes from "./routes/Champions.routes.js";
import championsRoutes from "./routes/LeagueEntries.routes.js";
import totalMasteryRoutes from "./routes/TotalMastery.routes.js";

app.use("/api", initAccountRoutes);
app.use("/api", leagueEntriesRoutes);
app.use("/api", championsRoutes);
app.use("/api", totalMasteryRoutes);

const port = 5001;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
