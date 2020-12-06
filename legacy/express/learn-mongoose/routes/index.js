var express = require("express");
let User = require("../schemas/user");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //신규 추가 내용
  User.find()
    .then((users) => {
      res.render("mongoose", { users });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
module.exports = router;
