import nano from "nanoexpress";
import { readFileSync as read } from "fs";

const app = nano()

app.get("/")
app.get("/*.html", (req, res) => read("public" + req.path));

app.listen(8000);