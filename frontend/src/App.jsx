import { useState } from "react";
import "./App.css";
import { Button, Form, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (name && tagline) {
      setAlertMessage(`Searching for Summoner: ${name}#${tagline}`);

      try {
        const getAccountData = await fetch(
          "http://localhost:5001/account-data",
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
        console.log(data);

        sessionStorage.setItem("accountData", JSON.stringify(data));

        // window.location.href = "profile.html";
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setAlertMessage("Please enter both summoner name and tag line.");
    }
  };

  return (
    <div className="App">
      <Card>
        <Card.Img
          src="https://www.pcgamesn.com/wp-content/sites/pcgamesn/2021/11/league-of-legends-arcane-phase-3.jpg"
          style={{ objectFit: "cover", width: "100%", height: "200px" }}
          alt="League of Legends Image"
        />

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
            Submit
          </Button>
        </Form>
      </Card>
      {alertMessage && (
        <Alert variant={alertMessage.includes("Please") ? "danger" : "info"}>
          {alertMessage}
        </Alert>
      )}
    </div>
  );
}

export default App;
