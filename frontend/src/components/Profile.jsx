import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { name, tagline } = useParams();
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [championNames, setChampionNames] = useState({});

  useEffect(() => {
    const storedData = sessionStorage.getItem("accountData");

    if (storedData) {
      setAccountData(JSON.parse(storedData));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [name, tagline]);

  useEffect(() => {
    const fetchChampionNames = async () => {
      const response = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json"
      );
      const data = await response.json();
      const championData = data.data;

      const nameLookup = Object.keys(championData).reduce(
        (acc, championKey) => {
          const champion = championData[championKey];
          acc[champion.key] = champion.id;
          return acc;
        },
        {}
      );

      setChampionNames(nameLookup);
    };

    fetchChampionNames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(accountData);

  // 1. Feature 1 Metadata (Name, Tagline, Profile Picture, Level)
  const profileId = accountData.summonerData.profileIconId;
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
  } else {
    hasARank = false;
  }

  // 3. Feature 3 Metadata (Top Champions)
  const champions = accountData.champions.map((champion) => {
    const championName =
      championNames[champion.championId] || "Unknown Champion";
    return {
      name: championName,
      level: champion.championLevel,
      points: champion.championPoints,
    };
  });

  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${profileId}.png`;

  return (
    <div>
      <CardGroup>
        <Card border="secondary" bg="blue" className="card1">
          <Card.Img variant="top" src={profileIcon} />
          <Card.Body>
            <Card.Title>
              {name} #{tagline}
            </Card.Title>
            <Card.Text>Level: {level}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card border="secondary" className="card2">
          <Card.Img variant="top" />
          {hasARank ? (
            <Card.Body>
              <Card.Title>Ranked Insights</Card.Title>
              <Card.Text>{queueType}</Card.Text>
              <Card.Text>
                {tier} {rank} | {lp}LP
              </Card.Text>
              <Card.Text>
                Wins: {wins} | Losses: {losses}
              </Card.Text>
            </Card.Body>
          ) : (
            <Card.Body>
              <Card.Title>Ranked Insights</Card.Title>
              <Card.Text>This summoner is currently unranked</Card.Text>
            </Card.Body>
          )}

          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card border="secondary" className="card3">
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Top Champions</Card.Title>
            {champions.length > 0 ? (
              champions.map((champion, index) => (
                <Card className="champion-card">
                  <Card.Img
                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_0.jpg`}
                  ></Card.Img>
                  <Card.Text key={index}>
                    Champion: {champion.name}, Level: {champion.level}, Points:{" "}
                    {champion.points}
                  </Card.Text>
                </Card>
              ))
            ) : (
              <Card.Text>No champion data available</Card.Text>
            )}
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <br />
      <Button onClick={() => navigate("/")}>Search for a new Summoner</Button>
    </div>
  );
};

export default Profile;
