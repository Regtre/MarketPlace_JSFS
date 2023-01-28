//Définition des modules
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");

// connexion à la base de données
const dbConnection = require("./controllers/db.controller.js");

//Definition des routeurs
const itemsRouter = require("./routes/items.route");
const indexRouter = require("./routes/index.route");
const usersRouter = require("./routes/users.route");

//On définit notre objet express nommé app
const app = express();

//Définition des CORS
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// global middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

//Définition du routeur
// const router = express.Router();
app.use("/", indexRouter);
app.use("/items", itemsRouter);
app.use("/users", usersRouter);

module.exports = app;
