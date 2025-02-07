const express = require("express");
const app = express();
const cors = require("cors");
const { api_key } = require("./config/Config.js");
const pool = require("./config/Database.js");

const initAccountRoutes = require("./routes/InitAccount.routes.js");
const leagueEntriesRoutes = require("./routes/Champions.routes.js");
const championsRoutes = require("./routes/LeagueEntries.routes.js");
const totalMasteryRoutes = require("./routes/TotalMastery.routes.js");

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
