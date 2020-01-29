require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_AUTH;
const client = require("twilio")(accountSid, authToken);

const sendSMS = (from, to, body) => {
  client.messages
    .create({
      body,
      from,
      to
    })
    .then(message => {
      console.log(message.sid);
      return message.sid;
    });
};
module.exports = sendSMS;
