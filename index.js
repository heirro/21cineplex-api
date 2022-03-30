const express = require("express");
const app = express();
const port = 3180;

const city = require("./city.json");
const now_play = require("./playing.json");
const theater = require("./reguler.json");
const upcoming = require("./upcoming.json");

app.get("/cineplex/city", (req, res) => {
  res.send(city);
});

app.get("/cineplex/playing", (req, res) => {
  res.send(now_play);
});

app.get("/theater/reguler", (req, res) => {
  res.send(theater);
});

app.get("/cineplex/upcoming", (req, res) => {
    res.send(upcoming);
});

app.listen(port, () => {
  console.log(
    `Jadalak API service [cineplex] listening at http://localhost:${port}/cineplex/`
  );
});
