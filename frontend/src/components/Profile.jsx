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
  const queueType = accountData.leagueEntries[0].queueType;
  const tier = accountData.leagueEntries[0].tier;
  const rank = accountData.leagueEntries[0].rank;
  const lp = accountData.leagueEntries[0].leaguePoints;
  const wins = accountData.leagueEntries[0].wins;
  const losses = accountData.leagueEntries[0].losses;

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
        <Card border="secondary" bg="light">
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

        <Card border="secondary" bg="light">
          <Card.Img variant="top" />
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
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>

        <Card border="secondary" bg="light">
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>Top Champions</Card.Title>
            {champions.length > 0 ? (
              champions.map((champion, index) => (
                <Card.Text key={index}>
                  Champion: {champion.name}, Level: {champion.level}, Points:{" "}
                  {champion.points}
                </Card.Text>
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
