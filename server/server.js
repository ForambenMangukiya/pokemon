const express = require("express");
const cors = require("cors");
let jsonData = require("./file.json");
// const { Pool } = require("pg");
// require("dotenv").config();
const app = express();
// app.use(express.json()); // select nd insert query mate
app.use(cors());
// const pool = new Pool();
const port = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//get alll data from pokemon
app.get("/pokemon", (req, res) => {
  res.json(jsonData);
});

// get one data from pokemon by its id
app.get("/pokemon/:id", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemon = jsonData.find((p) => p.id === pokemonId);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

// get  specific information about a pokemon
app.get("/pokemon/:id/:info", (req, res) => {
  const pokemonId = parseInt(req.params.id);
  const pokemon = jsonData.find((p) => p.id === pokemonId);
  if (pokemon) {
    const info = req.params.info.toLowerCase();
    if (info === "name" || info === "type" || info === "base") {
      res.json({ [info]: pokemon[info] });
    } else {
      res.status(400).json({ error: "Invalid info parameter" });
    }
  } else {
    res.status(404).json({ error: "Pokemon not found" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// //get alll data from pokemon
// app.get("/pokemon", (req, res) => {
//   res.json(pokedexData);
//   //   pool
//   //     .query("SELECT * FROM pokemon;")
//   //     .then((data) => res.json(data.rows))
//   //     .catch((e) => res.sendStatus(500));
// });

// // get one data from pokemon by its id
// app.get("/pokemon/:id", (req, res) => {
//   const { id } = req.params;
//   pool
//     .query("SELECT * FROM pokemon WHERE id =$1;", [id])
//     .then((data) => res.json(data.rows))
//     .catch((e) => res, sendStatus(500));
// });
