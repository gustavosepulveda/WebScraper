const PORT = 8000;
const axios = require("axios").default;
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/us";

//app.METHOD(PATH, HANDLER)

app.get("/", function(req, res) {
	res.json('This is my webscrapper')
})

app.get("/results", (req, res) => {
	axios(url)
	.then((response) => {
		const html = response.data;
		const srch = cheerio.load(html);
		const articles = [];

		srch(".fc-item__title", html).each(function () {
			const title = srch(this).text();
			const url = srch(this).find("a").attr("href");
			articles.push({
				title,
				url,
			})
		})
		res.json(articles)
	})	.catch((err) => console.log(err));
	
	
});





app.listen(PORT, () => console.log(`server is running on PORT ${PORT} `));
