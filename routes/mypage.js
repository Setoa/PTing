const express = require('express');
const router = express.Router();
const data= require('../controller/data');

router.get('/', function (req, res, next) {
    //현재 index 렌더링 해준다고 일단 써놨는데, 사용자 타입(trainn인지 trainer인지)에 따라 다른 페이지 렌더링.
    //추가로, 여기서 사용자 타입 보고 get 오더를 다르게 넣어줘서 redirect해줌. 그 후 redirect된 주소에서 다른 페이지 렌더링 하는 방식으로 진행.
    const usertype=req.user.usertype;
    if (usertype == 1) res.redirect('/mypage/trainer');
    if (usertype == 2) res.redirect('/mypage/trainee');
    //res.render('mypage/index');
});

router.get('/trainer', data.getTrainerInfo, data.getMyTrainees, data.getTimetable, function(req,res,next){
    res.render('mypage/trainer/trainer_page', {user:req.user, info:req.trainerinfo, trainees:req.trainees});
    //timetable도 만들고 나면 만들어 줄 것.
    //mytrainees가 contract랑 trainees랑 eager loading 한 정보라는 점 유의!!
});

router.get('/trainee', data.getMyTrainer, data.getSchedule, function(req,res,next){
    res.render('mypage/trainee/trainee_page', {user:req.user,trainer:req.mytrainer});
    //schedule도 만들고 나면 만들어 줄 것.
    //mytrainer가 contract랑 trainer랑 eager loading 한 정보라는 점 유의!!
});



module.exports = router;
