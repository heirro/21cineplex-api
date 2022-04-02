const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/:id", async (req, res) => {
  let url = "https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id="+ req.params.id + "&movie_id=";
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const elements = $("ul.list-group li.list-group-item");
    const schedules = [];
    elements.each((index, el) => {
      const schedule = {
        movie: [],
        banner: [],
        time: [],
        teater: [],
        rating: [],
        price: [],
        date: [],
        schedule: []
      };
      
      schedule.movie = $(el).children('a').text().trim();
      schedule.banner = $(el).children('a').children('img').attr('src');
      schedule.teater = $(el).children('span').text().split('R13+')[0].split('SU')[0].split('D17+')[0];
      schedule.rating = $(el).children('span').text().split('2D')[1];
      schedule.date = $(el).children('div').children('div').children('div').text().split('Rp')[0];
      schedule.time = $(el).children('div').html().split('<span class="glyphicon glyphicon-time"></span> ')[1];
      schedules.push(schedule);
    });
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      schedules
    }, null, 2));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;