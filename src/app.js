const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const hostname = "127.0.0.1";
const port = 3000;

/**
 * Connect Back-end application to MongoDB Database
 * DbName = db-nodeproject
 */
mongoose
  .connect("mongodb://localhost/db-nodeproject", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });



const schoolRoute = require("./api/routes/schoolRoute");
schoolRoute(server);
const groupRoute = require("./api/routes/groupRoute");
groupRoute(server);
const userRoute = require("./api/routes/userRoute");
userRoute(server);
// const entrantRoute = require("./api/routes/entrantRoute");
// entrantRoute(server);

server.listen(port, hostname);