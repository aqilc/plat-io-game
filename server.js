import nano from "nanoexpress/src/nanoexpress.js";
import { readFileSync as read } from "fs";

const app = nano()

app.get("/", (_, res) => res.redirect("/index.html"));
app.get("/(.*).html", (req, res) => {
  res.setHeader("content-type", "text/html");
  res.send(read("public" + req.path) + "");
});
app.listen(8000);