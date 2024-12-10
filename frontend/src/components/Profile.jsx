import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import { Button, Form, Card, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { name, tagline } = useParams();
  return (
    <div>
      Profile for {name}#{tagline}
    </div>
  );
};

export default Profile;
