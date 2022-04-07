const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/:id", async (req, res) => {
  let url = "https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id=" + req.params.id + "&movie_id=";
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const elementHeader = $("div.main-content");
    const teater = [];
    elementHeader.each((i, el) => {
      const header = {
        name: [],
        address: [],
        phoneNumber: [],
        locationUrl: [],
      };
      header.name = $('h4 > span > strong').text();
      header.address = $('h4 > span[style="font-size:14px"]')
        .html()
        .replace(/<br\s*\/?>/gi, ' ')
        .split('TELEPON')[0]
        .trim();
      header.phoneNumber = $('h4 > span[style="font-size:14px"]')
        .text()
        .split('TELEPON')[1]
        .replace(':', '')
        .trim();
      header.locationUrl = $('.map-link')
        .attr('href')
        .replace('&output=embed', '');
      teater.push(header);
    });
    const elementSchedule = $("ul.list-group li.list-group-item");
    const movie = [];
    elementSchedule.each((index, el) => {
      const schedule = {
        title: [{
          banner: [],
          duration: [],
          type: [],
          rating: [],
          price: [],
          date: [],
          time: []
        }],
      };

      schedule.title = $(el).children('a').text().trim();
      schedule.banner = $(el).children('a').children('img').attr('src');
      schedule.type = $(el).children('span').text().split('R13+')[0].split('SU')[0].split('D17+')[0];
      schedule.rating = $(el).children('span').text().split('2D')[1];
      schedule.date = $(el).children('div').children('div').children('div').children(".p_date").text();
      schedule.duration = $(el).children('div').html().split('<span class="glyphicon glyphicon-time"></span> ')[1];
      schedule.price = $(el).children('div').children('div').children('div').children(".p_price").text();
      schedule.time = $(el).children('div').children('div').children(".p_time.pull-left").children('a').parent().text().trim().split(' ');
      movie.push(schedule);
    });

    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({
      teater,
      schedules: [{
        movie
      }]
    }, null, 2));
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;