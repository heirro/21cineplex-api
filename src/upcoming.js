const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://m.21cineplex.com/gui.coming_soon.php";

async function scrapeUpcoming() {
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("div.grid_movie");
    const upcomings = [];
    listItems.each((idx, el) => {
      const upcoming = {
        id: [],
        movie: [],
        banner: [],
        rating: [],
        type: []
      };
      upcoming.id = $(el).children('a').attr('href').split('movie_id=')[1];
      upcoming.movie = $(el).children(".title").text();
      upcoming.banner = $(el).children("a").children("img").attr("src");
      upcoming.rating = $(el).children(".rating").children("a").text();
      upcoming.type = $(el)
        .children(".rating")
        .children("span")
        .text()
        .replace("*Advance Ticket Sales", "");
      upcomings.push(upcoming);
    });
    return upcomings;
  } catch (err) {
    console.error(err);
  }
}

module.exports = scrapeUpcoming;