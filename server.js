import nano from "nanoexpress/src/nanoexpress.js";
import { readFileSync as read } from "fs";

const app = nano()

app.use((req, res, next) => {
  if(!req.path.endsWith(".js")) next(req, res, next);
  res.setHeader("content-type", "application/javascript");
  res.end(read("js" + req.path) + "");
});

app.get("/", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send(read("public" + req.path) + "");
});

app.get("/style.css", (req, res) => {
  res.setHeader("content-type", "text/css");
  res.send(read("public" + req.path) + "");
});

app.listen(8000);