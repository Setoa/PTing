const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model").User;
const bcrypt = require("bcryptjs");
const Trainer = require("../model").Trainer;
const Trainee = require("../model").Trainee;

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser(async function (user, done) {
        const chkuser = await User.findOne({
            where: { id: user.id }
        });
        done(null, chkuser);
    });

    passport.use("signin", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: true,
        passReqToCallback: true
    }, async function (req, email, password, done) {
        const user = await User.findOne({
            where: { email: email }
        });
        if (!user) {
            return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    }));

    passport.use("signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        session: false,
        passReqToCallback: true
    }, async function (req, email, password, done) {
        if (req.body.password2 !== password) return done(null, false);
        const user = await User.findOne({
            where: { email: email }
        });
        if (user) {
            return done(null, false);
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const usertype=req.body.usertype;
        const newUser = await User.create({
            username: req.body.username,
            email: email,
            password: hash,
            usertype:usertype
        });
        if(usertype==1) {
            //trainer
            await Trainer.create({
                uid: newUser.dataValues.id
            });
        }
        if(usertype==2) {
            //trainee
            await Trainee.create({
                uid: newUser.dataValues.id
            });
        }
        return done(null, newUser);
    }));
};