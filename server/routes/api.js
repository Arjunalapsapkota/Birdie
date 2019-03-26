const router = require("express").Router();
const passport = require("passport");
router.post("/login", (req, res) => {
  console.log(req.body);
  console.log("hello");
  res.json({ name: "username" });
});
module.exports = router;
