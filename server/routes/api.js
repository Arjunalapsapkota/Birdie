const router = require("express").Router();
const passport = require("passport");
router.post("/login", (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.sendStatus(200);
});
module.exports = router;
