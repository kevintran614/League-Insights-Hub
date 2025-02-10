# League Insights Hub

Welcome to the League Insights Hub! This is a full-stack application leveraging React, Bootstrap, Node.js, and PostgreSQL. League Insights is a comprehensive League of Legends dashboard using the Riot Developer API that allows users
to query detailed player statistics for over 180 million users. Notable features include include Player Level, Rank, Win/Loss Ratio, Champion Mastery, and Player Match History. Follow the steps below to get started:

# Installation

Download the following dependencies.

### Backend

```python
cd backend

npm init -y
npm i -g concurrently
npm i express cors pg
npm i --save-dev nodemon
npm i -D jest supertest
```

### Frontend

```python
cd frontend

npm install react-bootstrap bootstrap react-router-dom
```

1. Image Demo:
<ul>
  <li>
    <img src="images/home.png" alt="Home Page" />
    <p>Home Page</p>
  </li>
  <li>
    <img src="images/search.png" alt="Search Page" />
    <p>Search Page</p>
  </li>
  <li>
    <img src="images/profile.png" alt="Profile Page" />
    <p>Profile Page</p>
  </li>
</ul>

2. Download dependencies first:<br>

   - cd backend<br>
   - npm init -y<br>
   - npm i -g concurrently<br><br>
   - npm i express cors pg<br>
   - npm install --save-dev nodemon<br><br>
   - npm i -D jest supertest<br>

   - cd frontend<br>
   - npm install react-bootstrap bootstrap react-router-dom<br>

3. To run the server:<br>
   - cd frontend > npm run dev
   - cd backend > npm run dev
