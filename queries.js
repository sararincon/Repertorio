const { pool } = require("./db.js"); // Importa la conexión a la base de datos

const getCanciones = async () => {
  const { rows } = await pool.query("SELECT * FROM canciones ORDER BY id");
  return rows;
};

const crearCancion = async ({ titulo, artista, tono }) => {
  const { rows } = await pool.query({
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
    values: [titulo, artista, tono],
  });

  return rows;
};

const editCancion = async ({ id, titulo, artista, tono }) => {
  // console.log(id, titulo, artista, tono);

  const dbQuery = {
    text: "UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *",
    values: [titulo, artista, tono, id],
  };
  const data = await pool.query(dbQuery);
  return data;
};

const deleteCancion = async (id) => {
  const dbQuery = {
    text: "DELETE FROM canciones WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  return result;
};

module.exports = {
  getCanciones,
  crearCancion,
  deleteCancion,
  editCancion,
};
