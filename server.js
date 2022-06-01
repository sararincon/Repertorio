const express = require("express");
const path = require("path");

const app = express();

const { getCanciones, crearCancion, deleteCancion } = require("./queries");

//Middleware (funciones que se ejecutan antes de que lleguen las rutas) "Entender el body"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/index.html"));
});

app.get("/canciones", async (req, res) => {
  try {
    const data = await getCanciones();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/cancion", async (req, res) => {
  try {
    await crearCancion(req.body); //req.body es el objeto que viene en el body de la petición
    res.status(201).json({ message: "Cancion creada correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/cancion/:id", async (req, res) => {
  try {
    await deleteCancion(req.params.id);
    res.status(200).json({ message: "Cancion eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
