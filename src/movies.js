const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/:id", async (req, res) => {
    let url = "https://m.21cineplex.com/gui.movie_details.php?sid=&movie_id=" + req.params.id;
    try {
        const {
            data
        } = await axios.get(url);
        const $ = cheerio.load(data);
        const listItems = $("div.main-content");
        const movies = [];
        listItems.each((idx, el) => {
            const movie = {
                id: [],
                title: [],
                type: [],
                rating: [],
                genre: [],
                duration: [],
                bannerUrl: [],
                trailerUrl: [],
                description: [],
                producer: [],
                director: [],
                writer: [],
                cast: [],
                distributor: [],
                website: [],
            };
            movie.id = req.params.id;
            movie.title = $(
                'div.col-xs-8.col-sm-11.col-md-11[style="font-weight: bold"] > div',
            ).text()
            movie.type = $('a.btn.disabled').text().trim()
            movie.rating = $('img[height="50"]')
                .attr('src')
                .split('/')[1]
                .split('.')[0]
                .toUpperCase()
            movie.bannerUrl = $('img.img-responsive').attr('src')
            movie.duration = $('.glyphicon-time').parent().text().trim()
            movie.description = $('#description').text()
            movie.producer = $('strong:contains("Producer")')
                .parent()
                .next()
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.director = $('strong:contains("Director")')
                .parent()
                .next()
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.writer = $('strong:contains("Writer")')
                .parent()
                .next()
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.cast = $('strong:contains("Cast")')
                .parent()
                .next()
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.genre = $('div.col-xs-8.col-sm-11.col-md-11')
                .next()
                .find('div')
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.distributor = $('strong:contains("Distributor")')
                .parent()
                .next()
                .text()
                .split(',')
                .map((value) => value.trim())
            movie.website = $('strong:contains("Website")')
                .parent()
                .next()
                .find('a')
                .attr('href')
            movie.trailerUrl = $('button:contains("TRAILER")')
                .attr('onclick')
                .split("'")[1]
            movies.push(movie);
        });
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({
            movies
        }, null, 2));
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;