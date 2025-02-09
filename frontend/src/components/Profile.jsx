import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { name, tagline } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem("accountData");

    if (storedData) {
      setAccountData(JSON.parse(storedData));
    }
    setLoading(false);
  }, [name, tagline]);

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

  // 3. Feature 3 Metadata (Top Champions)
  const playerTopChampions = accountData.champions;
  let topChampionMappings = {};

  for (let i = 0; i < playerTopChampions.length; i++) {
    const championId = playerTopChampions[i].championId;
    const championLevel = playerTopChampions[i].championLevel;
    const championPoints = playerTopChampions[i].championPoints;
    const championGrade = playerTopChampions[i].milestoneGrades[0];
    const championIcon = null; // todo

    topChampionMappings[championId] = [];

    topChampionMappings[championId].push({
      championId: championId,
      championLevel: championLevel,
      championPoints: championPoints,
      championGrade: championGrade,
    });
  }

  console.log(topChampionMappings);

  // 4. Total Mastery
  const totalMastery = accountData.totalMastery;

  // 5. Match History
  const matchInfos = accountData.matchInfos;

  // Game Info
  const playerGameMode = matchInfos[0].gameMode;
  const playerGameDuration = matchInfos[0].gameDuration;
  const playerGameResult = matchInfos[0].result;
  const playerGameHoursAgo = matchInfos[0].hoursAgo;

  // Champion Played
  const playerChampion = matchInfos[0].champion;
  const playerChampionLevel = matchInfos[0].championLevel;
  const playerSpellOne = matchInfos[0].spellOne;
  const playerSpellTwo = matchInfos[0].spellTwo;
  const playerCreepScore = matchInfos[0].creepScore;

  // KDA Metrics
  const kills = matchInfos[0].kills;
  const deaths = matchInfos[0].deaths;
  const assists = matchInfos[0].assists;
  const kda = matchInfos[0].kda;

  // Team Info
  const playerTeamMappings = matchInfos[0].teamMappings;
  const playerEnemyTeamMappings = matchInfos[0].enemyMappings;

  const url =
    "https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/Riven.png";

  const mapUrl = "https://images2.alphacoders.com/130/1303846.jpg";
  return (
    <div>
      <CardGroup>
        <Card border="secondary" bg="light">
          <Card.Header>Summoner Information</Card.Header>
          <Card.Body>
            <Card border="primary" bg="dark" text="light">
              <Card.Header>
                {name} #{tagline}
              </Card.Header>
              <Card.Img variant="top" src={profileIcon} />
              <Card.Text>Level: {level}</Card.Text>
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
          {Array.from({ length: 3 }).map((_, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Body>
                  <Card border="primary" bg="dark" text="light">
                    <Card.Header>
                      {name} #{tagline}
                    </Card.Header>
                    <Card.Img variant="top" src={url} />
                    <Card.Text>Level: {level}</Card.Text>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <br />
      <Button onClick={() => navigate("/")}>Search for a New Summoner</Button>
    </div>
  );
};

export default Profile;
