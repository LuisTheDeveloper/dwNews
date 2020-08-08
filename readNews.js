const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { response } = require("express");

const searchUrl =
  "https://www.dw.com/pt-002/not%C3%ADcias/mo%C3%A7ambique/s-30380";

function getHeadlines() {
  return fetch(`${searchUrl}`)
    .then((response) => response.text())
    .then((body) => {
      const headlines = [];
      const $ = cheerio.load(body);

      let tempData = "";
      let $url = "";

      $(".col2.basicTeaser").each(function (i, element) {
        const $element = $(element);

        if ($element.find(".imgTeaserM").length) {
          $url = $element.find("a");
        }

        if ($element.find(".teaserContentWrap").length) {
          tempData = $element.find("h2").children().remove().end().text();
          tempData = tempData.replace(/"|\n|#/g, "");

          const $title = tempData;

          tempData = $element.find("p").text();
          tempData = tempData.replace(/"|\n|#/g, "");
          const $lead = tempData;

          const news = {
            title: $title,
            lead: $lead,
            url: $url.attr("href"),
          };

          headlines.push(news);
        }

        if ($element.find(".group").length) {
          $url = $element.find(".news").children("a");

          tempData = $element.find(".news").children("a").children("h2").text();
          tempData = tempData.replace(/"|\n|#/g, "");
          const $title = tempData;

          tempData = $element.find(".news").children("a").children("p").text();
          tempData = tempData.replace(/"|\n|#/g, "");
          const $lead = tempData;

          const news = {
            title: $title,
            lead: $lead,
            url: $url.attr("href"),
          };

          headlines.push(news);

          if ($element.find(".linkList.intern").length) {
            $url = $element.find(".linkList.intern").children("a");

            tempData = $element
              .find(".linkList.intern")
              .children("a")
              .children("h2")
              .text();
            tempData = tempData.replace(/"|\n|#/g, "");
            const $title = tempData;

            const $lead = "";

            const news = {
              title: $title,
              lead: $lead,
              url: $url.attr("href"),
            };

            headlines.push(news);
          }

          if ($element.find(".linkList.overlayIcon").length) {
            $url = $element.find(".linkList.overlayIcon").children("a");

            const $title = "";
            const $lead = "";

            const news = {
              title: $title,
              lead: $lead,
              url: $url.attr("href"),
            };

            headlines.push(news);
          }
        }
      });

      return headlines;
    });
}

module.exports = {
  getHeadlines,
};
