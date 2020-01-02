require("dotenv").config();
const router = require("express").Router();
const multer = require("multer");
const path = require("path");
//set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
const upload = multer({ storage: storage }).single("image");

router.post("/picture", (req, res) => {
  console.log("received picture:", req.body);
  upload(req, res, err => {
    if (err) {
      res.send("Error occures");
    } else {
      console.log(" Requested file: ", req.file);
      res.send("test");
    }
  });
});
module.exports = router;
