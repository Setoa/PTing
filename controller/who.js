const model = require('../model');

module.exports = {
    meTrainer: async function(req,res,next){
        const trainer=await model.Trainer.findOne({
            where:{uid : req.user.id},
        });
        req.trainer=trainer;
        next();
    },
    meTrainee: async function (req, res, next) {
        const trainee = await model.Trainee.findOne({
            where: { uid: req.user.id }
        });
        req.trainee = trainee;
        next();
    }
};