require("dotenv").config();
//https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");
console.log(sgMail);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: "arjunalapsapkota@gmail.com",
  from: "test@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
sgMail.send(msg);
