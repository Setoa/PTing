const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const currentUser = req.user;
  if (currentUser) {
    res.render('index', { title: currentUser.username});
  }
  else res.render('index', { title: "Someone" });
});

router.get('/time',function(req,res,next){
  res.render('timetable');
});

module.exports = router;
