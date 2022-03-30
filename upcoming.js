const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://m.21cineplex.com/gui.coming_soon.php";
const filename = __filename.split(/[\\/]/).pop().replace(".js", "");

async function scrapeData() {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const listItems = $("div.grid_movie");
    const now_playing = [];
    listItems.each((idx, el) => {
      const now_play = { movie: [], banner: [], rating: [], studio: [] };
      now_play.movie = $(el).children(".title").text();
      now_play.banner = $(el).children("a").children("img").attr("src");
      now_play.rating = $(el).children(".rating").children("a").text();
      now_play.studio = $(el)
        .children(".rating")
        .children("span")
        .text()
        .replace("*Advance Ticket Sales", "");
      now_playing.push(now_play);
      //console.log('now_play', now_play);
    });
    fs.writeFile(
      filename + ".json",
      JSON.stringify(now_playing, undefined, 4),
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
