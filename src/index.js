const express = require("express");
const app = express();
const port = 3180;

const scrapeCity = require('./utils/city');
const scrapePlaying = require('./utils/playing');
const scrapeUpcoming = require('./utils/upcoming');

app.get("/cineplex/city", async (req, res) => {
  const cities = await scrapeCity();
  res.send({ cities });
});

app.get("/cineplex/playing", async (req, res) => {
  const playing = await scrapePlaying();
  res.send({ playing });
});

app.get("/cineplex/upcoming", async (req, res) => {
  const upcoming = await scrapeUpcoming();
  res.send({ upcoming });
});

app.listen(port, () => {
  console.log(
    `Jadalak API service [cineplex] listening at http://localhost:${port}/cineplex/`
  );
});
