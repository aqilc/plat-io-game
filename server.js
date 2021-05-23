import nano from "nanoexpress/src/nanoexpress.js";
import { readFileSync as read } from "fs";

const app = nano()


app.get("/style.css", (req, res) => {
  res.setHeader("content-type", "text/css");
  res.send(read("public/style.css") + "");
});

app.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send(read("public/index.html") + "");
});

app.get("/*", (req, res) => {
  console.log("or here")
  res.setHeader("content-type", "application/javascript");
  res.send(read("js" + req.path) + "");
});

app.listen(8000);