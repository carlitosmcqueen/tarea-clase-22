import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'

import daos from "../daos/index.js"
const {usuariosDao} = await daos

passport.use("signup", new LocalStrategy({passReqToCallback: true}, (req,username,password,done)=> usuariosDao.register(req,username,password,done)))

passport.use("login", new LocalStrategy({},(username,password,done)=> usuariosDao.login(username,password,done)))

passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
    usuariosDao.find(id, done);
})

export default passport