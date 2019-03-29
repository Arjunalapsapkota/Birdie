require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model.js");
const passportSetup = require("../config/passport-setup");
//list of strategies

const localStrategy = passport.authenticate("local", { session: true }); // Local Strategy
const googleauth = passport.authenticate("google", { scope: ["Email"] }); // google Strategy

const signup = (req, res, done) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("# \n # received-data from the Form: \n", req.body);

  if (!username || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  User.findOne({ username: username }, function(err, existingUser) {
    if (err) return done(null, false);

    //If yes, return error
    if (existingUser) {
      console.log("This is existing user, go to login or resest password");
      return res.status(422).send({ error: "# \n # Username already exists!" });
    }

    const user = new User({
      username,
      password
      // add the rest of the info from the form and save it to its proper place in the schema
    });

    console.log("# \n # Saving Data to the Database ..... ");

    user.save(function(err) {
      // if (err) return next(err);
      // //If no, respond to request indicating user was created
      // res.json({ token: tokenForUser(user) });
      if (err)
        return res.json(400, {
          error: 1,
          msg: "some error"
        });
      else {
        console.log("Newly created User", user);
        return done(null, user);
      }
    });
  });
};

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
    }
    res.json(user);
  })(req, res, next);
});

router.post("/signup", signup, localStrategy, (req, res) => {
  //res.redirect("/profile");
  console.log("user details :", req.body);
  res.json(200, {
    userId: req.user.id,
    msg: "User Created"
  });
});

router.get("/google", googleauth); // Google auth

//auth callback from google
router.get(
  "/google/redirect",

  passport.authenticate("google"), //what does this do?

  (req, res) => {
    res.redirect("http://localhost:3000/mySiftz");
    console.log(req);
  }
);
module.exports = router;
