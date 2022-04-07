const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://m.21cineplex.com/index.php";

async function scrapePlaying() {
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("div.grid_movie");
    const playings = [];
    listItems.each((idx, el) => {
      const playing = {
        id: [],
        movie: [],
        banner: [],
        rating: [],
        type: []
      };
      playing.id = $(el).children('a').attr('href').split('movie_id=')[1];
      playing.movie = $(el).children(".title").text();
      playing.banner = $(el).children("a").children("img").attr("src");
      playing.rating = $(el).children(".rating").children("a").text();
      playing.type = $(el)
        .children(".rating")
        .children("span")
        .text()
        .replace("*Advance Ticket Sales", "");
      playings.push(playing);
    });
    return playings;
  } catch (err) {
    console.error(err);
  }
}

module.exports = scrapePlaying;