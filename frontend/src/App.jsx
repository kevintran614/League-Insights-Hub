import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home.jsx";
import Profile from "./components/Profile.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile/:name/:tagline" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
