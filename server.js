import nano from "nanoexpress/src/nanoexpress.js";
import { readFileSync as read } from "fs";

const app = nano()

app.use((req, res, next) => {
  console.log("does it at least get ehre?", req.path);
  if(!req.path.endsWith(".js")) return next();
  console.log("or here")
  res.setHeader("content-type", "application/javascript");
  res.send(read("js" + req.path) + "");
});

app.get("/", (req, res) => {
  console.log("page requested")
  res.setHeader("content-type", "text/html");
  res.send(read("public/index.html") + "");
});

app.get("/style.css", (req, res) => {
  res.setHeader("content-type", "text/css");
  res.send(read("public/style.css") + "");
});

app.listen(8000);