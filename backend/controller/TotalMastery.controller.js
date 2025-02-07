/////////////////////////////////////////////////////////////////////////////////////////////
//   TotalMastery.controller.js: this will store all of the function logic for our routes  //
/////////////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const getTotalMastery = async (req, res) => {
  try {
    const { puuid } = req.query;

    const totalMastery = await fetchData(
      `https://na1.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${puuid}?api_key=${api_key}`
    );

    return totalMastery;
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getTotalMastery) An error occurred: ${error.message}` });
  }
};

module.exports = { getTotalMastery };
