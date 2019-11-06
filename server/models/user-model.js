require("dotenv").config();
const bcrypt = require("bcrypt-nodejs");
//const timestampPlugin = require("./plugins/timestamp");
const saltRounds = process.env.SALTROUND;
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  google: String,
  facebook: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  accountType: String,
  accountName: String,
  VerifiedPhone: Boolean,
  VerifiedEmail: Boolean
});
userSchema.pre("save", function(next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});
userSchema.methods.comparePassword = function(passw, cb) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
//userSchema.plugin(timestampPlugin);
const User = mongoose.model("user", userSchema);
module.exports = User;
