const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://m.21cineplex.com/gui.list_theater.php?sid=&city_id=10";
const filename = __filename.split(/[\\/]/).pop().replace(".js", "");

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("div.all li");
    const theaters = [];
    listItems.each((idx, el) => {
      const theater = { reguler: [] };
      theater.reguler = $(el).children("div").text();
      theaters.push(theater);
      //console.log('theater', theater);
    });
    fs.writeFile(
      `./component/views/${filename}.json`,
      JSON.stringify(theaters, undefined, 4),
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
