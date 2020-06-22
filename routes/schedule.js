const express = require('express');
const router = express.Router();
const data = require('../controller/data');
const who = require('../controller/who');
const auth = require('../controller/auth');

router.post('/ajax/:tid/:uid',function(req,res,next){
    console.log(req.body.schedule);
});




module.exports = router;