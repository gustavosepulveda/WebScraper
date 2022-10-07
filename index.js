const PORT = 8000;
const axios = require("axios").default;
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.theguardian.com/us";

const articles = [];

axios(url)
	.then((response) => {
		const html = response.data;
		const srch = cheerio.load(html);
		srch(".fc-item__title", html).each(function () {
			const title = srch(this).text();
			const url = srch(this).find("a").attr("href");
			articles.push({
				title,
				url,
			});
			console.log(articles);
		});
	})
	.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server is running on PORT ${PORT} `));
