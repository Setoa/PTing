const model = require('../model');

module.exports = {
    getTrainerList: async function (req, res, next) {
        const trainers = await model.Trainer.findAndCountAll({
            include: [model.User]
        });
        req.trainerlist = trainers;
        next();
    },
    getTrainerPost: async function (req, res, next) {
        const trainer = await model.Trainer.findOne({
            where: { id: req.params.id },
            include: [model.User]
        });
        req.trainerpost = trainer;
        next();
    },
    getTrainerName: async function(req,res,next){
        const name=await model.User.findOne({
            where:{id:req.ctrainer.dataValues.uid}
        });
        req.trainername=name.dataValues.username;
        next();
    },
    getContractSet: async function (req, res, next) {
        const cs = await model.ContractSet.findOne({
            where: { trainer_id: req.params.id }
        });
        req.contractset = cs;
        next();
    },
    setContract: async function(req,res,next){
        const cs=await model.ContractSet.findOne({
            where:{trainer_id:req.params.tid}
        });
        const chk=req.body.checkContract;
        let costPT;
        let numberPT;
        if(chk==1){
            costPT = cs.dataValues.cost10;
            numberPT = 10;
        }
        if (chk == 2) {
            costPT = cs.dataValues.cost20;
            numberPT = 20;
        }
        if (chk == 3) {
            costPT = cs.dataValues.cost30;
            numberPT = 30;
        }

        const contract=await model.Contract.create({
            trainer_id:req.params.tid,
            trainee_id:req.trainee.dataValues.id,
            pt_cost:costPT,
            pt_number:numberPT,
            pt_remain:numberPT
        })
        req.contract=contract;
        next();
    },

    getHisTrainees: async function (req, res, next) {
        const contract = await model.Contract.findAndCountAll({
            where: { trainer_id: req.params.id },
            include: [model.Trainee]
        });
        req.histrainees = contract;
        next();
    }, //trainer입장에서 contract정보와 그에 결부된 trainee 들 정보를 가져옴.

    getTraineeUser: async function (req, res, next) {
        for (row in req.histrainees.rows){
            const user=await model.User.findOne({
                where:{id:row.trainee.dataValues.uid}
            });
            row.traineeuser=user;
        }
        next()
    },
    getContractTrainer: async function(req,res,next){
        const trainer=await model.Trainer.findOne({
            where:{id:req.contract.trainer_id}
        });
        req.ctrainer=trainer;
        next();
    },
    getHisTrainer: async function (req, res, next) {
        const contract = await model.Contract.findOne({
            where: { trainee_id: req.trainee_id },
            include: [model.Trainer]
        });
        req.mytrainer = contract;
        next();
    }, //trainee입장에서 contract 정보와 그에 결부된 trainer정보를 가져옴.
    getTrainerInfo: async function (req, res, next) {
        const trainerinfo = await model.TrainerInfo.findOne({
            where: { trainer_id: req.params.id }
        });
        req.trainerinfo = trainerinfo
        next();
    }, //Trainer information 가져옴.
    setPayment: async function(req,res,next){

    },
    getTrainerCert: async function(req,res,next){

    },
    getTimetable: async function (req, res, next) {
        const tt=await model.Timetable.findAll({
            where:{trainer_id:req.params.id}
        });
        req.timetable=tt;
        next();
    },
    getSchedule: async function (req, res, next) {
        const sc=await model.Timetable.findAll({
            where:{trainer_id:req.mytrainer.dataValues.id}
        });
        req.schedule=sc;
        next();
    }
};