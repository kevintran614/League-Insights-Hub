const express = require("express");
const app = express();
const cors = require("cors");
const { api_key } = require("./config/Config.js");
const pool = require("./config/Database.js");

const initAccountRoutes = require("./routes/InitAccount.routes.js");
const leagueEntriesRoutes = require("./routes/Champions.routes.js");
const championsRoutes = require("./routes/LeagueEntries.routes.js");
const totalMasteryRoutes = require("./routes/TotalMastery.routes.js");
const matchesRoutes = require("./routes/Matches.routes.js");
const matchInfoRoutes = require("./routes/FindMatch.routes.js");
const displayAccount = require("./routes/DisplayAccount.routes.js");

app.use(express.json());
app.use(cors());

app.use("/api", initAccountRoutes);
app.use("/api", leagueEntriesRoutes);
app.use("/api", championsRoutes);
app.use("/api", totalMasteryRoutes);
app.use("/api", matchesRoutes);
app.use("/api", matchInfoRoutes);
app.use("/api", displayAccount);

if (process.env.NODE_ENV !== "test") {
  const port = 5001;
  app.listen(port, () => {
    console.log(`Express Server listening on Port ${port}`);
  });
}

module.exports = app;
