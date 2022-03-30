const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://m.21cineplex.com/gui.list_city.php";
const filename = __filename.split(/[\\/]/).pop().replace(".js", "");

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("ul.list-group li");
    const regions = [];
    listItems.each((idx, el) => {
      const region = { id: [], cities: [] };
      region.cities = $(el).children("div").html();
      region.id = $(el)
        .children("div")
        .attr("onclick")
        .split("'")[1]
        .replace("gui.list_theater.php?sid=&city_id=", "");
      regions.push(region);
      //console.log('region', region);
    });
    fs.writeFile(
      filename + ".json",
      JSON.stringify(regions, undefined, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(
          "[" + filename + ".js] >> Successfully written data to file:",
          filename + ".json"
        );
      }
    );
  } catch (err) {
    console.error(err);
  }
}

scrapeData();
