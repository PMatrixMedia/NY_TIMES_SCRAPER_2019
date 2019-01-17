const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
const articlesController = require("./controllers/articlesController");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
app.use(express.static("./src/components"));
app.use(express.static("./src/pages"));
// Add routes, both API and view

app.use("/");

app.use("/api/articles");

app.use("/api/")
  .get(articlesController.findAll)
  .post(articlesController.create);

app.use("/api/:id")
  .delete(articlesController.remove);



// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://nyt2019:iRS5iNg3Gr5TB4saBiZp0TyjWf9QnhwGdYzbiZljFKtDCq0WyTpdVhGnbuxBEVtvRNT3LapttpHkKqL7nSu1QQ==@nyt2019.documents.azure.com:10255/?ssl=true&replicaSet=globaldb",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
