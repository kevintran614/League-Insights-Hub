const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "perntodopassword",
  host: "localhost",
  port: 5432,
  database: "league",
});

module.exports = pool;
