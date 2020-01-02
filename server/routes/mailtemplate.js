const template = (host, token) => {
  const url = "http://host" + host + "/recovery/reset/" + token;
  const text =
    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
    url +
    "\n\n" +
    "If you did not request this, please ignore this email and your password will remain unchanged.\n";
  return text;
};
module.exports = template;
