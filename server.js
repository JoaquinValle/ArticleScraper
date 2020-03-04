const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require models
var db = require("./models");

var PORT =  process.env.PORT || 8080;

// Initialize Express
const app = express();

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/ArticleScraper";
mongoose.connect(MONGODB_URI);

// Routes
require("./routes/htmlRoutes")(app,db);
require("./routes/apiRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("Listening on " + PORT);
});