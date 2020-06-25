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
        req.setcontract=contract;
        next();
    },
    getMyTrainees: async function(req,res,next){
        console.log(req.trainer);
        const contract=await model.Contract.findAndCountAll({
            where:{trainer_id:req.trainer.dataValues.id},
            include:[model.Trainee]
        });
        contract.rows.forEach(async function(row){
            console.log(row)
            const user = await model.User.findOne({
                where: { id: row.trainee.dataValues.uid }
            });
            row.trainee.dataValues.username = user.dataValues.username;
            console.log(row.trainee.dataValues);
        })
        // for(let row in contract.rows){
        //     console.log(row);
        //     const user=await model.User.findOne({
        //         where:{id:row.trainee.uid}
        //     });
        //     row.trainee.dataValues.username=user.dataValues.username;
        // }
        req.mytrainees=contract;
        next();
    },
    getMyContractSet: async function(req,res,next){
        const cs = await model.ContractSet.findOne({
            where: { trainer_id: req.trainer.dataValues.id }
        });
        req.mycontractset = cs;
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
        next();
    },
    getContractTrainer: async function(req,res,next){
        const trainer=await model.Trainer.findOne({
            where:{id:req.setcontract.dataValues.trainer_id}
        });
        req.ctrainer=trainer;
        next();
    },
    getMyTrainer: async function (req, res, next) {
        const contract = await model.Contract.findOne({
            where: { trainee_id: req.trainee.id },
            include: [model.Trainer]
        });
        req.mytrainer = contract;
        next();
    },
    getHisTrainer: async function(req,res,next){
        const contract = await model.Contract.findOne({
            where: { trainee_id: req.params.id },
            include: [model.Trainer]
        });
        req.histrainer = contract;
        next();
    },
    getTrainerInfo: async function (req, res, next) {
        const trainerinfo = await model.TrainerInfo.findOne({
            where: { trainer_id: req.params.id }
        });
        req.trainerinfo = trainerinfo
        next();
    }, //Trainer information 가져옴.
    getContract: async function (req, res, next) {
        const contract = await model.Contract.findOne({
            where: { id: req.params.cid }
        });
        req.contract = contract;
        next();
    },
    getTimetable: async function (req, res, next) {
        const tt=await model.Timetable.findAll({
            where:{trainer_id:req.params.id}
        });
        req.timetable=tt;
        next();
    },
    getMySchedule: async function (req, res, next) {

        const sc=await model.Timetable.findAll({
            where:{trainer_id:req.mytrainer.trainer.dataValues.id}
        });
        req.myschedule=sc;
        next();
    },
    getHisSchedule: async function(req,res,next){
        const sc=await model.Timetable.findAll({
            where:{trainer_id:req.histrainer.dataValues.id}
        });
        req.hisschedule=sc;
        next();
    },
    getMyTrainerName: async function(req,res,next){
        const tn=await model.Trainer.findOne({
            where:{id:req.mytrainer.trainer.dataValues.id},
            include:[model.User]
        });
        req.tn=tn.user.dataValues.username;
        next();
    },
    getHisTrainerName: async function(req,res,next){
        const tn=await model.Trainer.findOne({
            where:{id:req.histrainer.trainer.dataValues.id},
            include:[model.User]
        });
        req.htn=tn.user.dataValues.username;
        next();
    },
    getTraineeUser:async function(req,res,next){
        const tu=await model.Trainee.findOne({
            where:{id:req.params.id},
            include:[model.User]
        });
        req.trn=tu.user;
        next();
    },
    getMyBodyProfile: async function(req,res,next){
        const bp=await model.BodyProfile.findOne({
            where:{trainee_id:req.trainee.dataValues.id}
        });
        req.mybodyprofile=bp;
        next();
    },

    getHisBodyProfile: async function (req, res, next) {
        const bp = await model.BodyProfile.findOne({
            where: { trainee_id: req.params.id }
        });
        req.hisbodyprofile = bp;
        next();
    },

    setBodyProfile: async function(req,res,next){
        const age=req.body.age;
        const height=req.body.height;
        const weight=req.body.weight;
        const bmi=weight/(height*height)*100/100;
        const bmr=((10*weight)+(6.25*height*100)-(5*age)+5)*100/100;
        const bp=await model.BodyProfile.create({
            trainee_id:req.params.id,
            age:age,
            height:height,
            weight:weight,
            bmi:bmi,
            bmr:bmr,
            note:req.body.note
        });
        await model.Contract.update({
            pt_remain:model.sequelize.literal('pt_remain-1')
        },{
            where:{trainee_id:req.params.id}
        });
        next();
    }
};