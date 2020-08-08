const express = require("express");
const headlines = require("./readNews");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello!",
  });
});

app.get("/headlines", (req, res) => {
  headlines.searchHeadlines().then((headlines) => {
    res.json(headlines);
  });
});

app.get("/test", (req, res) => {
  headlines.test().then((test) => {
    res.json(test);
  });
});

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
