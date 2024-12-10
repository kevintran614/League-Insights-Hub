import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { name, tagline } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      Profile for {name}#{tagline}
      <Button onClick={() => navigate("/")}>Search for a new Summoner</Button>
    </div>
  );
};

export default Profile;
