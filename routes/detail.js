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

router.get('/trainer', who.meTrainer, data.getMyTrainees, data.getMyContractSet,function(req,res,next){
    res.render('detail/trainer/mypage',{user:req.user,trainer:req.trainer, trainees:req.mytrainees, cs: req.mycontractset})
}); //trainer mypage

router.get('/trainee', who.meTrainee, data.getMyTrainer, data.getMyBodyProfile, data.getMySchedule, data.getMyTrainerName, function(req,res,next){
    res.render('detail/trainee/mypage', {trainee : req.trainee,user:req.user,trainer:req.mytrainer, schedule:req.myschedule, trainername:req.tn, bodyprofile:req.mybodyprofile});
}); //trainee mypage

router.get('/trainer/:id',function(req,res,next){
    res.redirect(`/employ/${req.params.id}`);
});

router.get('/trainee/:id', data.getHisTrainer, data.getHisBodyProfile, data.getTraineeUser, data.getHisTrainerName,function(req,res,next){
    res.render('detail/trainee/trainee_page', { traineeid: req.params.id, user: req.trn, trainer: req.histrainer, trainername:req.htn, bodyprofile:req.hisbodyprofile });
});

router.get('/trainee/:id/bodyprofile', function (req, res, next) {
    res.render('detail/trainee/createbody',{id:req.params.id});
});

router.post('/trainee/:id/bodyprofile', data.setBodyProfile, function(req,res,next){
    res.redirect(`/detail/trainee/${req.params.id}`);
});

module.exports = router;