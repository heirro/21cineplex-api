const express = require("express");
const app = express();
const port = 3180;

const scrapeCity = require('./src/city');
const scrapePlaying = require('./src/playing');
const scrapeUpcoming = require('./src/upcoming');

app.get("/cineplex/city", async (req, res) => {
  const city = await scrapeCity();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({city}, null, 2));
});

app.get("/cineplex/playing", async (req, res) => {
  const playing = await scrapePlaying();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({playing}, null, 2));
});

app.get("/cineplex/upcoming", async (req, res) => {
  const upcoming = await scrapeUpcoming();
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({upcoming}, null, 2));
});

app.listen(port, () => {
  console.log(
    `Jadalak API service [cineplex] listening at http://localhost:${port}/cineplex/`
  );
});
