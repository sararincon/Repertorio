const express = require("express");
const path = require("path");

const app = express();

const {
  getCanciones,
  crearCancion,
  deleteCancion,
  editCancion,
} = require("./queries");

//Middleware (funciones que se ejecutan antes de que lleguen las rutas) "Entender el body"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

app.get("/canciones", async (req, res) => {
  try {
    const data = await getCanciones();
    // console.log(data);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/cancion", async (req, res) => {
  try {
    await crearCancion(req.body);
    //console.log(req.body);
    res.status(201).json({ message: "Cancion creada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/cancion/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, artista, tono } = req.body;
    const resp = await editCancion({ id, titulo, artista, tono });

    res.status(200).json({
      message: "Cancion editada correctamente",
      resultado: resp.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/cancion?", async (req, res) => {
  try {
    const { id } = req.query;
    await deleteCancion(+id);
    res.status(200).json({ message: "Cancion eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
