const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://m.21cineplex.com/gui.list_city.php";

async function scrapeCity() {
  try {
    const {
      data
    } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("ul.list-group li");
    const regions = [];
    listItems.each((idx, el) => {
      const region = {
        id: [],
        city: []
      };
      region.city = $(el).children("div").html();
      region.id = $(el)
        .children("div")
        .attr("onclick")
        .split("'")[1]
        .replace("gui.list_theater.php?sid=&city_id=", "");
      regions.push(region);
    });
    return regions;
  } catch (err) {
    console.error(err);
  }
}

module.exports = scrapeCity;