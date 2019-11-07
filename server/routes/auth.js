require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model.js");
const passportSetup = require("../config/passport-setup");
//list of strategies

const localStrategy = passport.authenticate("local", { session: true }); // Local Strategy
const googleauth = passport.authenticate("google", { scope: ["Email"] }); // google Strategy

const signup = (req, res, done) => {
  const { username, password, email, phone } = req.body;

  console.log("# \n # received-data from the Form: \n", req.body);

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  User.findOne({ email }, function(err, existingUser) {
    if (err) return done(null, false);
    console.log("##   Existing user details:", existingUser);
    //If yes, return error
    if (existingUser) {
      console.log("This is existing user, go to login or resest password");
      return res
        .status(422)
        .send({ error: "Email already exists! Try logging in !!" });
    } else {
      const user = new User({
        username,
        password,
        email,
        phone
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
    }
  });
};
//#########################      important !!
// router.post("/login", localStrategy, (req, res) => {
//   //res.redirect("/profile");

//   console.log("user details :", req.user);
//   res.json(200, {
//     userId: req.user.id,
//     msg: "User Found"
//   });
// });

//############################   important !!
// router.post("/login", (req, res) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return err;
//     }
//     if (!user) {
//       return res.json({ message: info.message });
//     }
//     res.json(user);
//   })(req, res);
// });
const LOGIN_REDIRECT =
  process.env.NODE_ENV === "production"
    ? "https://birdiez.herokuapp.com/dash"
    : "http://localhost:3000/dash";

// Login Route ##########################################################
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: info.message });
      //res.status(200).send(info.message);
    }
    // See passport js Document
    //note that authenticate() is called from within the route handler,
    //rather than being used as route middleware
    //This gives the callback access to the req and res objects through closure
    //now it becomes necessary to establsih a session by calling req.login() and send a response

    // req.login() actually saves the cookie in request body.
    // which is actually accessible from :  req.session.passport.user
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      console.log("session data 2st:", req.session);
      return res.json(200, {
        msg: "OK"
      });
      //return res.redirect(200, "http://localhost:3000/dash");
    });
  })(req, res, next);
});

// SignUP ROute #############################################################

// router.post("/signup", signup, localStrategy, (req, res) => {
//   //res.redirect("/profile");
//   console.log("user details :", req.body);
//   res.json(200, {
//     userId: req.user.id,
//     msg: "User Created"
//   });
// });
router.post("/signup", signup, function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(user);
      return res.json({ message: info.message });
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json(200, {
        msg: "OK"
      });
      //return res.redirect(200, "http://localhost:3000/dash");
    });
  })(req, res, next);
});

// LOGOOUT Route #############################################################
router.get("/logout", (req, res) => {
  req.logout();
  if (process.env.NODE_ENV === "production")
    // For Heroku
    res.redirect("https://birdiez.herokuapp.com/login");
  // For Local Host
  else res.redirect("http://localhost:3000/login");
});

// Google auth Route ##########################################################
router.get("/google", googleauth);

//auth callback from google
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  if (process.env.NODE_ENV === "production")
    // For Heroku
    res.redirect("https://birdiez.herokuapp.com/dash");
  // res.json(200, {
  //   userId: req.user.id,
  //   msg: "User Created"
  // });
  // For Local Host
  else res.redirect("http://localhost:3000/dash");
});

// Facebook Auth route #########################################################
router.get("/facebook", passport.authenticate("facebook"));

// auth callback from facebook
router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (err, req, res, next) => {
    if (err.name === "TokenError") {
      if (process.env.NODE_ENV === "production")
        // For Heroku
        res.redirect("https://birdiez.herokuapp.com/login");
      // For Local Host
      else res.redirect("http://localhost:3000/login");
    } else {
      // Handle other errors here
    }
  },
  (req, res) => {
    if (process.env.NODE_ENV === "production")
      // For Heroku
      res.redirect("https://birdiez.herokuapp.com/dash");
    // For Local Host
    else res.redirect("http://localhost:3000/dash");
    //res.send(req.user);
  }
);

//#################################################################################

router.get("/check", (req, res) => {
  // This is to check if the session is maintained
  //i.e. whenever a user refreshes the page or wish to come back later
  // we need to check if he is still logged in
  // as long as token remail valid
  // see passportjs documentation for req.isAuthenticated method
  console.log("cookies received from the browser side:", req.cookies);
  console.log("req is authenticated:", req.session.passport);
  req.isAuthenticated()
    ? (console.log("User authenticated"),
      res.json(200, {
        userId: req.user,
        msg: "OK"
      }))
    : res.json(400, { msg: "Unauthorized" });
});
module.exports = router;
