const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/:id", async (req, res) => {
  let url = "https://m.21cineplex.com/gui.list_theater.php?sid=&city_id=" + req.params.id;
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("div.nav_theater_content div li");
    const theaters = [];
    listItems.each((idx, el) => {
      const teater = {
        id: [],
        name: []
      };
      teater.name = $(el).children("div").text();
      teater.id = $(el)
        .children("div")
        .attr("onclick")
        .split("'")[1]
        .replace("gui.schedule.php?sid=&find_by=1&cinema_id=", "")
        .replace("&movie_id=", "");
      theaters.push(teater);
    });
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      theaters
    }, null, 2));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;