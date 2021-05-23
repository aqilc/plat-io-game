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
  
    // Websocket behavioral options
    idleTimeout: 10,
    compression: 0,
    maxPayloadLength: 1024 * 1024,
  
    open(ws) { console.log("Connection opened"); },
  
    // When a message is recieved
    message(ws, message, binary) {
      
      // Auto parses the given arraybuffer??
      if(!binary)
        message = message.toString("utf8");
      
      // If it's JSON, parse it
      if(typeof message === "string") {
        let start = message[0];
        if (start === "[" || start === "{" && message.indexOf("[object") < 0)
          message = JSON.parse(message);
        console.log(message + "");
      }
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