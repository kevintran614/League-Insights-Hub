const express = require("express");
const app = express();
const cors = require("cors");
const { api_key } = require("./config.js");
const pool = require("./db");

// port
const port = 5001;

// middleware
app.use(express.json());
app.use(cors());

// Utility function to fetch metadata
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    res
      .status(500)
      .json({ error: `(fetchData) An error occurred: ${error.message}` });
  }
};

// Get Account Data Wrapper
const getAccountData = async (gameName, tagLine) => {
  try {
    // 1. Get encrypted account puuid by Account gameName and tagLine
    const accountData = await fetchData(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${api_key}`
    );
    const puuid = accountData.puuid;

    // 2. Feature # 1 - Get Account ProfileIconId, Summoner Level
    const summonerData = await fetchData(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
    );

    // 3. Get encrypted summoner id using encrypted account puuid
    const encryptedSummonerId = summonerData.id;

    // 4. Feature # 2 - Get Account Tier, Rank, League Points, Wins, Losses by encrypted summoner id
    const leagueEntries = await fetchData(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${api_key}`
    );

    // 5. Feature # 3 - Get Account Top 3 Champions by Master (Descending)
    const champions = await fetchData(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${api_key}`
    );

    // 5. Feature # 4 - Get Account Total Mastery
    const totalMastery = await fetchData(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${puuid}?api_key=${api_key}`
    );

    return {
      gameName,
      tagLine,
      summonerData,
      leagueEntries,
      champions,
      totalMastery,
    };
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getAccountData) An error occurred: ${error.message}` });
  }
};

// POST: Fetch Account Metadata
app.post("/account-data", async (req, res) => {
  try {
    const { gameName, tagLine } = req.body;

    const accountData = await getAccountData(gameName, tagLine);

    const insertAccountData = await pool.query(
      "INSERT INTO summonerData (summonerName, summonerTagline, summonerMetaData) VALUES($1, $2, $3) RETURNING *",
      [gameName, tagLine, JSON.stringify(accountData)]
    );

    console.log("Data inserted:", insertAccountData.rows);

    res.status(200).json(accountData);
  } catch (error) {
    res.status(500).json({
      error: `(GET: /get-account) An error occurred: ${error.message}`,
    });
  }
});

app.listen(port, () => {
  console.log(`Express Server listening on Port ${port}`);
});
