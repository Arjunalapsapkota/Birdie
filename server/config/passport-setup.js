require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user-model.js");

passport.serializeUser((user, done) => {
  console.log("# serializing User...");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("# Deserializing User...");
  User.findById(id).then(user => {
    done(null, user);
  });
});

//Create local strategy
const localOptions = { usernameField: "username" };
const localLogin = new LocalStrategy(localOptions, function(
  username,
  password,
  done
) {
  console.log("# Searching the Database ..");
  console.log(username);
  User.findOne({ username }, (err, user) => {
    if (err) return done(err, false, { message: "DB error" });
    if (!user) {
      return done(null, false, { message: "No User" });
    } else
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err, false, { message: "Internal error" });
        if (!isMatch) {
          console.log("# NO MATCH: Please provide Valid Credentials");
          return done(null, false, { message: "Password error" });
        } else {
          console.log(
            "# User found in the database,\n Forwading the details .."
          );
          return done(null, user, { message: "success" });
        }
      });
  });
});

passport.use(localLogin);

//
passport.use(
  new GoogleStrategy(
    {
      //option for strategy

      //callbackURL: "/auth/google/redirect", //this is for local
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect" //this is for local

      // callbackURL: "https://resktop.herokuapp.com/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      //   console.log("callback is fired");
      //   console.log("where is ID?", profile);
      //check if user is already in our database
      const email = profile.emails[0].value;
      User.findOne({ email: email }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            email: email,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.Facebook_CLIENTID,
      clientSecret: process.env.Facebook_CLIENTSECRET,
      callbackURL: "/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(
        "#### #### #### \n Here Comes the Data from Instagram \n *****\n data:",
        profile
      );
      const email = profile.emails[0].value;
      User.findOne({ email: email }).then(userExsist => {
        if (userExsist) {
          console.log("user found", userExsist);
          done(null, userExsist);
        } else {
          new User({
            email: email,
            googleId: profile.id
          })
            .save()
            .then(newUser => {
              console.log("new user created", newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
