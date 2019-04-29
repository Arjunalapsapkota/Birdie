require("dotenv").config();
const mongodb = require("mongoose");
const authroutes = require("./routes/auth.js");
const recovery = require("./routes/recovery.js");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3090;
const app = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const expressSession = require("express-session");
const passportSetup = require("./config/passport-setup");
const cors = require("cors");
const flash = require("express-flash");
// app.use(cors());
// app.use("*", function(req, res, next) {
//   //replace localhost:8080 to the ip address:port of your server
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });

// //enable pre-flight
// app.options("*", cors());

// Define middleware here

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(expressSession({ secret: [process.env.COOKIEKEY] }));
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIEKEY]
  })
);
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Define auth routes here
app.use("/auth", authroutes);
app.use("/recovery", recovery);
// Serve up static assets (usually on heroku)

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
