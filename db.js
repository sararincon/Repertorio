//Conexión a la base de datos
const { Pool } = require("pg");

const pool = new Pool({
  user: "sararincon",
  host: "localhost",
  database: "repertorio",
  password: "password",
  port: 5432,
});

module.exports = {
  pool,
};
