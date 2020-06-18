const model=require('../model');

module.exports={
    getTrainerList: async function(req,res,next){
        const trainers=await model.Trainer.findAndCountAll({
            include:[model.User]
        });
        req.trainers=trainers;
        next();
    },
    getTrainer: async function(req,res,next){
        const trainer=await model.Trainer.findOne({
            where:{id:req.params.id},
            include:[model.User]
        });
        req.trainer=trainer;
        next();
    },
    getContractSet: async function(req, res, next){
        const cs=await model.ContractSet.findOne({
            where:{trainer_id:req.params.id}
        });
        req.contractset=cs;
        next();
    },
    getMyTrainees: async function(req,res,next){
        const contract = await model.Contract.findAndCountAll({
            where: { trainer_id: req.user.id },
            include: [model.Trainee]
        });
        req.contract = contract;
        next();
    }, //trainer입장에서 contract정보와 그에 결부된 trainee 들 정보를 가져옴.
    getMyTrainer: async function(req,res,next){
        const contract = await model.Contract.findOne({
            where: { trainee_id: req.user.id },
            include: [model.Trainer]
        });
        req.mytrainer=contract;
        next();
    }, //trainee입장에서 contract 정보와 그에 결부된 trainer정보를 가져옴.
    getTrainerInfo: async function(req,res,next){
        const trainerinfo = await model.TrainerInfo.findOne({
            where:{trainer_id:req.user.id}
        });
        req.trainerinfo=trainerinfo
        next();
    }, //Trainer information 가져옴.
    getTimetable: async function(req,res,next){
        //timetable가져오기.
        next();
    },
    getSchedule: async function(req,res,next){
        //timetable가져오는데 trainee입장에서 가져오는거라 프로세스 조금 다름. 그냥 다르게 만들어 주자.
        next();
    }
};