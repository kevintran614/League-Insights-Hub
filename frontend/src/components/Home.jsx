import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showGif, setShowGif] = useState(false);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    if (name && tagline) {
      setAlertMessage(`Searching for Summoner: ${name}#${tagline}`);
      setShowGif(true);

      try {
        const getAccountData = await fetch(
          "http://localhost:5001/api/display-account",
          {
            method: "POST",
            body: JSON.stringify({
              gameName: name,
              tagLine: tagline,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );

        const data = await getAccountData.json();

        sessionStorage.setItem("accountData", JSON.stringify(data));
        navigate(`/profile/${name}/${tagline}`);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setAlertMessage("Please enter both summoner name and tag line.");
      setShowGif(false);
    }
  };

  return (
    <div className="App">
      <Card bg="light" border="secondary">
        <Card.Img
          src="../src/assets/arcane.jpg"
          style={{ objectFit: "cover", width: "100%", height: "200px" }}
          alt="League of Legends Image"
        />
        <br />
        <Card.Title>League Insights Hub</Card.Title>
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3" controlId="summonerName">
            <Form.Label>Summoner Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Summoner"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="tagline">
            <Form.Label>Tagline</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <br />
      </Card>
      {alertMessage && (
        <Alert variant={alertMessage.includes("Please") ? "danger" : "info"}>
          {alertMessage}
        </Alert>
      )}
      {showGif && (
        <img
          src="https://media2.giphy.com/media/FoKl27OsaScXqx2m5T/giphy.webp?cid=790b7611z7wvk4dezdr141e7gxg8sa32qzd4278ud4cme5le&ep=v1_gifs_search&rid=giphy.webp&ct=g"
          alt="Loading gif"
          style={{ marginTop: "20px", width: "200px", height: "auto" }}
        />
      )}
    </div>
  );
};

export default Home;
