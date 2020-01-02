require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user-model.js");
const passportSetup = require("../config/passport-setup");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const crypto = require("crypto");
const async = require("async");
const nodemailer = require("nodemailer");

const sendthemail = require("./sendthemail");
//list of strategies
const ID = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const localStrategy = passport.authenticate("local", { session: true }); // Local Strategy
const googleauth = passport.authenticate("google", { scope: ["Email"] }); // google Strategy
router.get("/reset/:user", function(req, res) {
  console.log("Received Token in the URL:", req.params.user);
  User.findOne(
    {
      resetPasswordToken: req.params.user,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        // return res.redirect("http://localhost:3000/forgot");
        if (process.env.NODE_ENV === "production")
          // For Heroku
          return res.redirect("https://birdiez.herokuapp.com/forgot");
        // For Local Host
        else return res.redirect("http://localhost:3000/forgot");
      }
      //res.redirect("http://localhost:3000/credentials/" + req.params.user);
      if (process.env.NODE_ENV === "production")
        // For Heroku
        return res.redirect(
          "https://birdiez.herokuapp.com/credentials/" + req.params.user
        );
      // For Local Host
      else
        return res.redirect(
          "http://localhost:3000/credentials/" + req.params.user
        );
    }
  );
});

//#############################################################################################
router.post("/credentials", (req, res) => {
  const { password, token } = req.body;

  console.log("# \n # received-data from the Form: \n", req.body);

  User.findOne(
    {
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    function(err, user) {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");

        if (process.env.NODE_ENV === "production")
          // For Heroku
          return res.redirect("https://birdiez.herokuapp.com/forgot");
        // For Local Host
        else return res.redirect("http://localhost:3000/forgot");
      }
      user.password = password;
      user.resetPasswordToken = "";
      // add the rest of the info from the form and save it to its proper place in the schema
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
          console.log("PASSWORD CHANGED..");
          //return (null, user);
          return res.json(200, {
            msg: "OK"
          });
        }
      });
    }
  );

  console.log("# \n # Saving Data to the Database ..... ");
});

//#############################################################################################

//JJJJJJ
router.post("/forgot", function(req, res, next) {
  console.log("Received Email:", req.body.email);
  //Runs an array of functions in series,
  //each passing their results to the next in the array.
  //However, if any of the functions pass an error to the callback,
  //the next function is not executed
  //and the main callback is immediately called with the error
  async.waterfall(
    [
      function(done) {
        console.log("generating token.. \n");
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          console.log("token: ", token);
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            console.log("User not Found");

            return res.json(400, {
              msg: "NA"
            });
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            console.log("saving data..");
            done(err, token, user);
          });
        });
      },
      function(token, user) {
        console.log("preparing mail..", user);
        sendthemail(token, user, req.headers.host);
      }
    ],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});
module.exports = router;
