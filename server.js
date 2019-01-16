const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://3c033080-0ee0-4-231-b9ee:NseWqWgNJavLjpS8jiHtPyZF8eP10iTLWRFrXbB0vw3QPoWNBFkCAG35hc3SFB1fPXqG7Za0GtwBHmo2IfHJzw%3D%3D@3c033080-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true/savedarticles",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
