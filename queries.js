const { pool } = require("./db.js"); // Importa la conexión a la base de datos

const getCanciones = async () => {
  const { rows } = await pool.query("SELECT * FROM canciones");
  return rows;
};

const crearCancion = async ({ titulo, artista, tono }) => {
  pool.query({
    text: "INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3)",
    //values: [req.body.titulo, req.body.artistas, req.body.tono]
    values: [titulo, artista, tono],
  });
  return rows;
};

const deleteCancion = async (id) => {
  pool.query({
    text: "DELETE FROM canciones WHERE id = $1",
    values: [id],
  });
};

module.exports = {
  getCanciones,
  crearCancion,
  deleteCancion,
};
