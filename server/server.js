require("dotenv").config();
const mongodb = require("mongoose");
const authroutes = require("./routes/auth.js");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3090;
const app = express();
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./config/passport-setup");
var cors = require("cors");
app.use(cors());

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Define auth routes here
app.use("/auth", authroutes);

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
