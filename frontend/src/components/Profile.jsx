import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { name, tagline } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topChampionMappings, setTopChampionMappings] = useState({});
  const [playerMatchInfos, setPlayerMatchInfos] = useState({});

  useEffect(() => {
    const storedData = sessionStorage.getItem("accountData");

    if (storedData) {
      setAccountData(JSON.parse(storedData));
    }
    setLoading(false);
  }, [name, tagline]);

  const getPlayerTopChampions = async (accountData) => {
    try {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/11.18.1/data/en_US/champion.json"
      );
      const data = await response.json();
      const champions = data.data;

      let championIdMappings = {};

      for (const champion in champions) {
        const championData = champions[champion];
        championIdMappings[championData.key] = championData.id;
      }

      const playerTopChampions = accountData.champions;
      let topChampionMappings = {};

      for (let i = 0; i < playerTopChampions.length; i++) {
        const championId = playerTopChampions[i].championId;
        const championName = championIdMappings[championId];
        const championLevel = playerTopChampions[i].championLevel;
        const championPoints = playerTopChampions[i].championPoints;

        if (!topChampionMappings[championName]) {
          topChampionMappings[championName] = [];
        }

        topChampionMappings[championName].push({
          championLevel: championLevel,
          championPoints: championPoints,
        });
      }

      setTopChampionMappings(topChampionMappings);
    } catch (error) {
      console.error("Error getting top player champions:", error);
    }
  };

  const getPlayerMatchInfos = async (accountData) => {
    try {
      // 5. Match History
      const matchInfos = accountData.matchInfos;
      let playerMatchInfos = {};

      for (const [key, value] of Object.entries(matchInfos)) {
        // Game Info
        const playerGameMode = value.gameMode;
        const playerGameDuration = value.gameDuration;
        const playerGameResult = value.result;
        const playerGameHoursAgo = value.hoursAgo;

        // Champion Played
        const playerChampion = value.champion;
        const playerChampionLevel = value.championLevel;
        const playerSpellOne = value.spellOne;
        const playerSpellTwo = value.spellTwo;
        const playerCreepScore = value.creepScore;

        // KDA Metrics
        const kills = value.kills;
        const deaths = value.deaths;
        const assists = value.assists;
        const kda = value.kda;

        // Team Info
        const playerTeamMappings = value.teamMappings;
        const playerEnemyTeamMappings = value.enemyMappings;

        playerMatchInfos[key] = {
          playerGameMode: playerGameMode,
          playerGameDuration: playerGameDuration,
          playerGameResult: playerGameResult,
          playerGameHoursAgo: playerGameHoursAgo,
          playerChampion: playerChampion,
          playerChampionLevel: playerChampionLevel,
          playerSpellOne: playerSpellOne,
          playerSpellTwo: playerSpellTwo,
          playerCreepScore: playerCreepScore,
          playerKills: kills,
          playerDeaths: deaths,
          playerAssists: assists,
          playerKda: kda,
          playerTeamMappings: playerTeamMappings,
          playerEnemyTeamMappings: playerEnemyTeamMappings,
        };
      }

      setPlayerMatchInfos(playerMatchInfos);
    } catch (error) {
      console.error("Error getting player match infos:", error);
    }
  };

  useEffect(() => {
    if (accountData) {
      getPlayerTopChampions(accountData);
      getPlayerMatchInfos(accountData);
    }
  }, [accountData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 1. Feature 1 Metadata (Name, Tagline, Profile Picture, Level)
  const profileId = accountData.summonerData.profileIconId;
  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${profileId}.png`;
  const level = accountData.summonerData.summonerLevel;

  // 2. Feature 2 Metadata (Rank, Tier, LP, Wins, Losses)
  let hasARank = false;

  if (accountData.leagueEntries[0] !== undefined) {
    hasARank = true;
    var queueType = accountData.leagueEntries[0].queueType;
    var tier = accountData.leagueEntries[0].tier;
    var rank = accountData.leagueEntries[0].rank;
    var lp = accountData.leagueEntries[0].leaguePoints;
    var wins = accountData.leagueEntries[0].wins;
    var losses = accountData.leagueEntries[0].losses;
  }

  // 4. Total Mastery
  const totalMastery = accountData.totalMastery;

  const mapUrl = "https://images2.alphacoders.com/130/1303846.jpg";

  function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  }

  return (
    <div>
      <CardGroup>
        <Card border="secondary" bg="light">
          <Card.Header>Summoner Information</Card.Header>
          <Card.Body>
            <Card border="light" bg="dark" text="light">
              <Card.Header>
                {name} #{tagline}
              </Card.Header>
              <Card.Img variant="top" src={profileIcon} />
              <ListGroup border="dark">Level: {level}</ListGroup>
            </Card>
          </Card.Body>
        </Card>

        <Card border="secondary" bg="light">
          <Card.Header>Ranked Performance</Card.Header>
          {hasARank ? (
            <Card.Body>
              <Card border="primary">
                <Card.Header>Summoner Rank Type</Card.Header>
                <Card.Text>Queue Type: {queueType}</Card.Text>
              </Card>
              <br />
              <Card border="primary">
                <Card.Header>Summoner Rank</Card.Header>
                <Card.Text>
                  {tier} {rank}, {lp}LP
                </Card.Text>
              </Card>
              <br />
              <Card border="primary">
                <Card.Header>Win Loss Statistics</Card.Header>
                <Card.Text>
                  Wins: {wins} | Losses: {losses}
                </Card.Text>
              </Card>
              <br />
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Title>Ranked Insights</Card.Title>
              <Card.Text>This summoner is currently unranked</Card.Text>
            </Card.Body>
          )}
        </Card>

        <Card border="secondary" bg="light">
          <Card.Header>Status</Card.Header>
          <Card.Body>
            <Card border="primary" bg="dark" text="light">
              <Card.Header>Currently on Summoner's Rift</Card.Header>
              <Card.Img variant="top" src={mapUrl} />
            </Card>
          </Card.Body>
        </Card>
      </CardGroup>

      <br />

      <Card>
        <Card.Header>Top Champions</Card.Header>

        <br />

        <Row xs={1} md={3} className="g-4">
          {(() => {
            const championCards = [];
            const keys = Object.keys(topChampionMappings);

            for (let i = 0; i < keys.length; i++) {
              const championName = keys[i];
              const championData = topChampionMappings[championName][0];
              const championLevel = championData.championLevel;
              const championPoints = championData.championPoints;
              const championImageUrl = `https://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${championName}.png`;

              championCards.push(
                <Col key={i}>
                  <Card>
                    <Card.Body>
                      <Card border="light" bg="dark" text="light">
                        <Card.Header>{championName}</Card.Header>
                        <Card.Img variant="top" src={championImageUrl} />
                        <ListGroup>Level: {championLevel}</ListGroup>
                        <ListGroup>Points: {championPoints}</ListGroup>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }

            return championCards;
          })()}
        </Row>
      </Card>

      <br />

      <Card>
        <Card.Header>Match History</Card.Header>

        <br />

        <Row xs={2} md={2} className="g-4">
          {(() => {
            const playerMatchInfoCards = [];
            const keys = Object.keys(playerMatchInfos);

            for (let i = 0; i < keys.length; i++) {
              if (i == 4) {
                break;
              }
              // Game Info
              const playerGameMode = playerMatchInfos[keys[i]].playerGameMode;
              const playerGameDuration =
                playerMatchInfos[keys[i]].playerGameDuration;
              const playerGameResult =
                playerMatchInfos[keys[i]].playerGameResult;
              const playerGameHoursAgo =
                playerMatchInfos[keys[i]].playerGameHoursAgo;

              // Champion Played
              const playerChampion = playerMatchInfos[keys[i]].playerChampion;
              const playerChampionLevel =
                playerMatchInfos[keys[i]].playerChampionLevel;
              const playerSpellOne = playerMatchInfos[keys[i]].playerSpellOne;
              const playerSpellTwo = playerMatchInfos[keys[i]].playerSpellTwo;
              const playerCreepScore =
                playerMatchInfos[keys[i]].playerCreepScore;

              // KDA Metrics
              const playerKills = playerMatchInfos[keys[i]].playerKills;
              const playerDeaths = playerMatchInfos[keys[i]].playerDeaths;
              const playerAssists = playerMatchInfos[keys[i]].playerAssists;
              const playerKda = playerMatchInfos[keys[i]].playerKda;

              // Team Info
              const playerTeamMappings =
                playerMatchInfos[keys[i]].playerTeamMappings;
              const playerEnemyTeamMappings =
                playerMatchInfos[keys[i]].playerEnemyMappings;

              playerMatchInfoCards.push(
                <Col key={i}>
                  <Card>
                    <Card.Body>
                      <Card
                        border="dark"
                        bg={playerGameResult ? "success" : "danger"}
                        text="light"
                      >
                        <Card.Header>{playerGameMode}</Card.Header>
                        <ListGroup horizontal>
                          <Card.Img
                            variant="top"
                            src={`https://ddragon.leagueoflegends.com/cdn/12.16.1/img/champion/${playerChampion}.png`}
                            style={{ width: "150px" }}
                          />
                          <ListGroup.Item style={{ width: "150px" }}>
                            <ListGroup>
                              <ListGroup.Item>{playerGameMode}</ListGroup.Item>
                              <ListGroup.Item>
                                {playerGameResult ? "Win" : "Loss"}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {formatDuration(playerGameDuration)} mins
                              </ListGroup.Item>
                            </ListGroup>
                          </ListGroup.Item>
                          <ListGroup.Item style={{ width: "150px" }}>
                            <ListGroup>
                              <ListGroup.Item>
                                {playerKills} / {playerDeaths} / {playerAssists}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {playerKda.toFixed(2)} KDA
                              </ListGroup.Item>
                              <ListGroup.Item>
                                {playerCreepScore} CS
                              </ListGroup.Item>
                            </ListGroup>
                          </ListGroup.Item>
                          <ListGroup.Item style={{ width: "150px" }}>
                            <ListGroup>
                              <ListGroup.Item>
                                Level : {playerChampionLevel}
                              </ListGroup.Item>
                              <ListGroup.Item>{playerSpellOne}</ListGroup.Item>
                              <ListGroup.Item>{playerSpellTwo}</ListGroup.Item>
                            </ListGroup>
                          </ListGroup.Item>
                        </ListGroup>
                        <Card.Text>{playerGameHoursAgo} hours ago</Card.Text>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }

            return playerMatchInfoCards;
          })()}
        </Row>
      </Card>

      <br />

      <Button onClick={() => navigate("/")}>Search for a New Summoner</Button>
    </div>
  );
};

export default Profile;
