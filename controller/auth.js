module.exports = {
    isLogin: function (req, res, next) {
        if (!req.user) {
            return res.redirect('/');
        }
        next();
    },
    isTrainer: function(req, res, next) {
        if(req.user.usertype==1) {
            return res.redirect('/');
        }
        next();
    },
    isTrainee: function (req, res, next) {
        if (req.user.usertype == 2) {
            return res.redirect('/');
        }
        next();
    }

};