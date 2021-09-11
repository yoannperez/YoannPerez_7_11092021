//                                         -------------------------------------------------------
//                                         --                  SERVER FILE                      --
//                                         -------------------------------------------------------

const http = require("http");
const app = require("./app");


// Send a valid port either number or string
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Set port either from environment or selected port
const port = normalizePort(process.env.PORT || "3000");

// set port
app.set("port", port);

// Search and manage server errors
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);

// Listen events, return informations into console
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Server started, listening on " + bind);
});

server.listen(port);
