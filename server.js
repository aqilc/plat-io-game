import uws from "uWebSockets.js";
import { readFileSync as read } from "fs";

// The entirety of the web routes and webapp code
uws.App()

  // Styles
  .get("/style.css", (res, req) => {
    res.writeHeader("content-type", "text/css");
    res.end(read("public/style.css") + "");
  })
  
  // The main webpage
  .get("/", (res, req) => {
    res.writeHeader("content-type", "text/html");
    res.end(read("public/index.html") + "");
  })

  .ws("/ws", {
    idleTimeout: 10,
    compression: 0,
    maxPayloadLength: 1024 * 1024,
  
    open(ws) { console.log("Connection opened"); },
    message(ws, message, binary) {
      if (binary) message = Buffer.from(message).toString("utf8");
      
      let start = message[0];
      if (start === "[" || start === "{" && message.)
      console.log(message + "");
    },
    drain(ws) { console.log("drain?"); },
    close(ws, code, message) {
      console.log("Connection closed", code, message);
    }
  })
  
  // Everything else, including all of the javascript
  .get("/*", (res, req) => {
    const path = req.getUrl();
    if(!path.endsWith(".js")) return res.writeStatus("404"), res.end();
    res.writeHeader("content-type", "application/javascript");
    res.end(read("js" + path) + "");
  }).listen(8000, () => console.log("Your app is listening on port 8000"));