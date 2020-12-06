var express = require("express");
let User = require("../models").User; //추가 내용
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  //신규 추가 내용
  User.findAll()
    .then((users) => {
      res.render("sequelize", { users });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});
/*
Async / Await
router.get('/', async(req,res,next)=>{
  try{
    const users =await User.findAll();
    res.render('sequelize', {'users'})
  } catch (error){
    console.log(error)
    next(error)
  }
})

*/

module.exports = router;
