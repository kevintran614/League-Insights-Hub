import "bootstrap/dist/css/bootstrap.min.css";

import { useState, useEffect } from "react";
import { Button, Card, CardGroup } from "react-bootstrap";
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
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [name, tagline]);

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
  const champions = accountData.champions
    .map((champion) => {
      return `Champion: ${champion.championId}, Level: ${champion.championLevel}, Points: ${champion.championPoints}`;
    })
    .join(", ");

  const profileIcon = `http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${profileId}.png`;

  return (
    <div>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={profileIcon} />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This card has supporting text below as a natural lead-in to
              additional content.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <Button onClick={() => navigate("/")}>Search for a new Summoner</Button>
    </div>
  );
};

export default Profile;
