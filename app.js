var express = require("express");
var axios = require("axios"),
  fs = require("fs"),
  request = require("request"),
  cheerio = require("cheerio");
app = express();
env = process.env;

async function scrapWebsiteData(req, res) {
  var url = "https://en.wikipedia.org/wiki/Shiv_Jayanti";
  request(url, async function (error, req, res) {
    var resObj = {};

    //if there was an error
    if (error) {
      res.end(JSON.stringify({ error: "There was an error of some kind" }));
      return;
    }

    //create the cheerio object
    resObj = {};

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    ($title = $("head title").text()),
      ($desc = $('meta[name="description"]').attr("content")),
      ($ogTitle = $('meta[property="og:title"]').attr("content")),
      ($ogImage = $('meta[property="og:image"]').attr("content")),
      ($site_name = $('meta[property="og:site_name"]').attr("content"));
    $site_url = $('meta[name="url"]').attr("content");

    if ($title) {
      resObj.title = $title;
    }

    if ($site_name) {
      resObj.site_name = $site_name;
    }

    if ($desc) {
      resObj.description = $desc;
    }

    if ($ogImage && $ogImage.length) {
      resObj.ogImage = $ogImage;
    }

    if ($ogTitle && $ogTitle.length) {
      resObj.ogTitle = $ogTitle;
    }

    if ($site_url) {
      resObj.$site_url = $site_url;
    }

    //  writing scrapped data to file
    fs.writeFile("coutries.json", JSON.stringify(resObj, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  });
}

//listen for an HTTP request
app.listen(env.NODE_PORT || 3000, env.NODE_IP || "localhost");
scrapWebsiteData();
