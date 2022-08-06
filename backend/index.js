const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const morgan = require("morgan");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

require("./config/db")();

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  pingTimeout: 1000,
  pingInterval: 2000,
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.io = io;
  next();
});
require("./routes/routes")(app);
require("./socket")(io);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.....`
  );
});
