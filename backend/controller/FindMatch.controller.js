/////////////////////////////////////////////////////////////////////////////////////////////
//    FindMatch.controller.js: this will store all of the function logic for our routes    //
/////////////////////////////////////////////////////////////////////////////////////////////

const fetchData = require("../utils/FetchData.js");
const { api_key } = require("../config/Config.js");

const getMatchInfo = async (matchId, puuid) => {
  try {
    const matchInfo = await fetchData(
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`
    );

    const queueMappings = {
      400: "Normal Draft",
      420: "Ranked Solo/Duo",
      430: "Normal Blind",
      440: "Ranked Flex",
      450: "ARAM",
      700: "Clash",
      900: "URF",
      1020: "One for All",
      1200: "Nexus Blitz",
    };

    const spellMappings = {
      21: "Barrier",
      1: "Cleanse",
      2202: "Flash",
      2201: "Flee",
      14: "Ignite",
      3: "Exhaust",
      4: "Flash",
      6: "Ghost",
      7: "Heal",
      13: "Clarity",
      30: "To the King!",
      31: "Poro Toss",
      11: "Smite",
      39: "Mark",
      32: "Mark",
      12: "Teleport",
      54: "Placeholder",
      55: "Placeholder and Attack-Smite",
    };

    let teamMappings = {};
    let enemyMappings = {};

    let playerIndex = -1;
    for (let i = 0; i < matchInfo.info.participants.length; i++) {
      if (puuid === matchInfo.info.participants[i].puuid) {
        playerIndex = i;
        break;
      }
    }

    const gameMode = queueMappings[matchInfo.info.queueId];

    const gameDuration = matchInfo.info.gameDuration;

    const playerTeamId = matchInfo.info.participants[playerIndex].teamId;

    const matchResult = matchInfo.info.participants[playerIndex].win;
    let result = "Loss";

    if (matchResult) {
      result = "Win";
    }

    const champion = matchInfo.info.participants[playerIndex].championName;

    const championLevel = matchInfo.info.participants[playerIndex].champLevel;

    const spellOne =
      spellMappings[matchInfo.info.participants[playerIndex].summoner1Id];

    const spellTwo =
      spellMappings[matchInfo.info.participants[playerIndex].summoner2Id];

    const kills = matchInfo.info.participants[playerIndex].kills;

    const deaths = matchInfo.info.participants[playerIndex].deaths;

    const assists = matchInfo.info.participants[playerIndex].assists;

    for (let i = 0; i < matchInfo.info.participants.length; i++) {
      currentPlayer = matchInfo.info.participants[i];
      currentPlayerTeamId = currentPlayer.teamId;

      if (currentPlayerTeamId === playerTeamId) {
        teamMappings[currentPlayer.riotIdGameName] = currentPlayer.championId;
      } else {
        enemyMappings[currentPlayer.riotIdGameName] = currentPlayer.championId;
      }
    }

    const matchDetails = {
      gameMode: gameMode,
      result: result,
      gameDuration: gameDuration,
      champion: champion,
      championLevel: championLevel,
      spellOne: spellOne,
      spellTwo: spellTwo,
      kills: kills,
      deaths: deaths,
      assists: assists,
      teamMappings: teamMappings,
      enemyMappings: enemyMappings,
    };

    console.log(matchDetails);

    return matchDetails;
  } catch (error) {
    res
      .status(500)
      .json({ error: `(getMatchInfo) An error occurred: ${error.message}` });
  }
};

module.exports = { getMatchInfo };
