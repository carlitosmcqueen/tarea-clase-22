import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local'

import daos from "../daos/DaoFactory.js"
const {usuariosDao,carritoDao} = await daos

passport.use("signup", new LocalStrategy({passReqToCallback: true}, async (req,username,password,done)=> {
    
    const carrito = await carritoDao.createCart()
    usuariosDao.register(req,username,password,carrito,done)

}))

passport.use("login", new LocalStrategy({},(username,password,done)=> usuariosDao.login(username,password,done)))

passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
    usuariosDao.find(id, done);
})

export default passport