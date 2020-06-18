const express = require('express');
const router = express.Router();
const data=require('../controller/data');

//index로 list 대체
router.get('/', data.getTrainerList, function(req,res,next){
    res.render('employ/index',{rows:req.trainers});
    //trainers는 user와 eager loading한 정보.
});

router.get('/:id', data.getTrainer, function(req,res,next){
    //id에 해당하는 trainer 데이터를 DB에서 가져와서 페이지에 넘겨줌. 페이지에서 적당한 조작을 통해 예쁘게 출력. 
    res.render('employ/trainer',{trainer:req.trainer});
    // 
});

router.get('/:id/contract', data.getContractSet, function(req,res,next){
    //해당하는 trainer와 현재 trainee의 계약 페이지.
    res.render('employ/contract', {cs:req.contractset, user:req.user, trainer_id:req.params.id}); //user=currentUser
});


module.exports = router;
