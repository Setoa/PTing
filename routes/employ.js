const express = require('express');
const router = express.Router();
const data=require('../controller/data');
const auth=require('../controller/auth');
const who=require('../controller/who');
const { setPayment } = require('../controller/data');

//index로 list 대체
router.get('/', data.getTrainerList, function(req,res,next){
    res.render('employ/index',{rows:req.trainerlist});
    //trainers는 user와 eager loading한 정보.
});

router.get('/:id', data.getTrainerPost, data.getHisTrainees, data.getTrainerInfo, function(req,res,next){
    //id에 해당하는 trainer 데이터를 DB에서 가져와서 페이지에 넘겨줌. 페이지에서 적당한 조작을 통해 예쁘게 출력. 
    res.render('employ/trainer',{currentUser:req.user, trainer:req.trainerpost, trainees:req.histrainees, trainerinfo:req.trainerinfo, timetable:req.timetable});
    
});

router.get('/:id/contract', auth.isTrainee, data.getContractSet, function(req,res,next){
    //해당하는 trainer와 현재 trainee의 계약 페이지.
    res.render('employ/contract', {cs:req.contractset, user:req.user, trainer_id:req.params.id}); //user=currentUser
});


router.post('/:tid/contract/:uid', auth.isTrainee, who.meTrainee, data.setContract, data.getContractTrainer,data.getTrainerName, function(req,res,next){
    res.render('employ/payment', {contract : req.contract,username:req.trainername });
});

router.post('/payment/:cid', function(req,res,next){
    res.render('employ/paymentcomplete');
});

module.exports = router;
