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
        movie: [],
        banner: [],
        rating: [],
        studio: []
      };
      upcoming.movie = $(el).children(".title").text();
      upcoming.banner = $(el).children("a").children("img").attr("src");
      upcoming.rating = $(el).children(".rating").children("a").text();
      upcoming.studio = $(el)
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