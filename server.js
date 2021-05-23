import uws from "uWebSockets.js";
import { readFileSync as read } from "fs";

const app = uws.App();

app.get("/style.css", (res, req) => {
  res.writeHeader("content-type", "text/css");
  res.end(read("public/style.css") + "");
});

app.get("/", (res, req) => {
  res.writeHeader("content-type", "text/html");
  res.end(read("public/index.html") + "");
});

app.get("/*", (res, req) => {
  const path = req.getUrl();
  if(!path.endsWith(".js")) return res.writeStatus("404"), res.end();
  console.log("or here")
  res.writeHeader("content-type", "application/javascript");
  res.end(read("js" + path) + "");
});

app.listen(8000, () => console.log("listening on port 8000"));