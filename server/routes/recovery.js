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
        return res.redirect("http://localhost:3000/forgot");
      }
      res.redirect("http://localhost:3000/credentials/" + req.params.user);
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
router.post("/forgot", function(req, res, next) {
  console.log("Received Email:", req.body.email);
  async.waterfall([
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

      const sendthemail = async () => {
        console.log("mail being prepared for :", user.email);
        const oauth2Client = new OAuth2(ID, SECRET);
        oauth2Client.setCredentials({
          refresh_token: REFRESH_TOKEN
        });

        const tokens = await oauth2Client.getAccessToken();
        console.log("token from Oauth :  ", tokens.token);
        const accessToken = tokens.token;
        let mailOpts, smtpTrans;
        smtpTrans = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "arjunalapsapkota@gmail.com",
            clientId: ID,
            clientSecret: SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
            expires: 1484314697598
          },
          TLS: {
            rejectUnauthorized: false
          }
        });
        //
        // verify connection configuration
        smtpTrans.verify(function(error, success) {
          if (error) {
            console.log(error);
          } else {
            console.log("Server is ready to send the message..");
          }
        });
        mailOpts = {
          from: "Support" + " &lt;" + "Birdie" + "&gt;",
          to: user.email,
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/recovery/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTrans.sendMail(mailOpts, function(error, response) {
          if (error) {
            return res.send("contact-failure");
          } else {
            console.log("message sent");
            return res.json(200, {
              msg: "OK"
            });
          }
        });
      };
      sendthemail();
    }
  ]);
});
module.exports = router;
