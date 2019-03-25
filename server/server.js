require("dotenv").config();
const mongodb = require("mongoose");
const apiroutes = require("./routes/api.js");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3090;
const app = express();
const cookieSession = require("cookie-session");
var cors = require("cors");
// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//app.use(cors);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
// Define API routes here
app.use("/api", apiroutes);
// Send every other request to the React app
// Define any API routes before this runs
try {
  mongodb.connect(process.env.MONGO_DB_URL, () => {
    console.log("connected mongoDB");
  });
} catch (error) {
  console.log(error);
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
