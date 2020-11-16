"use strict";

const app = require("../src/app");
const debug = require("debug")("nodestr:server");
const http = require("http");

const port = normalizedPort(process.env.PORT || "3333");
app.set("port", port);

const server = http.createServer(app);

server.listen(port, console.log("Started server in port " + port + "!"));
server.on("listening", onListening);

function normalizedPort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onListening() {
  const addr = server.address();

  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
