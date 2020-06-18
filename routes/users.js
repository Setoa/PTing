const express = require("express");
const router = express.Router();
const passport=require("passport");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.get("/signin", function(req,res,next){
  if(req.user) res.redirect('/');
  res.render("users/signin");
});

router.get("/signup", function (req, res, next) {
  res.render("users/presignup");
}); //trainer 가입인지 trainee가입인지 정하는 페이지.

router.get("/signup/:usertype", function(req,res,next){
  res.render('users/signup', {usertype:req.params.usertype});
});

router.post("/signin", passport.authenticate("signin",{
    successRedirect:"/",
    failureRedirect:"/users/signin",
    failureFlash:true
}));

//new sign up
router.post("/signup", passport.authenticate("signup", {
    successRedirect:"/",
    failureRedirect:"/users/signup",
    failureFlash:true
}));


router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

module.exports = router;