const express = require("express");
const headlines = require("./readNews");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello!",
  });
});

app.get("/headlines", (req, res) => {
  headlines.getHeadlines().then((headlines) => {
    res.json(headlines);
  });
});

const port = process.env.PORT || 3010;

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
