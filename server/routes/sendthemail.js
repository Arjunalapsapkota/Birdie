require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const mailtemplate = require("./mailtemplate.js");
const OAuth2 = google.auth.OAuth2;
const ID = process.env.CLIENT_ID;
const SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const sendthemail = async (token, user, host) => {
  console.log("mail being prepared for :", user.email);
  const oauth2Client = new OAuth2(ID, SECRET);
  console.log("refresh token :", REFRESH_TOKEN);
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
    text: mailtemplate(host, token)
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

module.exports = sendthemail;
