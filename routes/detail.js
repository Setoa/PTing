const express = require('express');
const router = express.Router();
const data= require('../controller/data');
const who=require('../controller/who');
const auth=require('../controller/auth');

router.get('/', function (req, res, next) {
    const usertype=req.user.usertype;
    if (usertype == 1) res.redirect('/detail/trainer');
    if (usertype == 2) res.redirect('/detail/trainee');

});

router.get('/trainee', who.meTrainee, data.getHisTrainer, data.getSchedule, function(req,res,next){
    res.render('detail/trainee/trainee_page', {trainee : req.trainee,user:req.user,trainer:req.mytrainer, timetable:req.schedule});
});


module.exports = router;
