import express from 'express'
import { Router } from 'express'
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import UsuariosPass from "../contenedores/contenedorMongoUsuarios.js";
import isLoggedIn from "../../middlewares/log.js";

const router = Router()
const app = express()
app.use(express.json())


passport.use("singup",
new LocalStrategy({passReqToCallback: true},(req,username,password,done)=>{
    UsuariosPass.findOne({username},(err,user)=>{
        if(user) return done(null,false)
        UsuariosPass.create(
            {username, password: PassHashed(password)},
            (err,user)=>{
                if (err) return done(err)
                return done(null,user)
            },

        )
    })
})
)

passport.use("login",
new LocalStrategy({},(username, password, done)=>{
    UsuariosPass.findOne({username}, (err,user)=>{
        if (err) return done(err)
        if (!user) return done(null,false)
        if (!validatePass(password,user.password)) return done(null,false)
        return done(null,user)
    })
})
)

const PassHashed = (pass) => {
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
}

const validatePass = (pass,hashedPass) => {
    return bcrypt.compareSync(pass,hashedPass)
}

passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
});

passport.deserializeUser((id, done) => {
    UsuariosPass.findById(id, done);
});


app.use(passport.initialize());
app.use(passport.session());

router.get("/login",isLoggedIn, (req,res)=>{
    res.render("main",{layout:"login"})

})

router.post(
    "/login",passport.authenticate("login", { failureRedirect: "/loginError" }),
    (req, res) => {
        const { username } = req.body;
        req.session.user = username;
        res.redirect("/");
    }
);

router.get("/loginError", (req, res) => {
    res.render("main",{layout:"loginError"});
})


router.get('/register', (req, res) => {
    res.render('main', {layout: 'register'})
})
  
router.post('/register', passport.authenticate('singup', { failureRedirect: "/registerError" }), (req, res) => {
    console.log("se registro")
    res.redirect('/');
});

router.get("/registerError",(req, res)=>{
    res.render("main",{layout:"registerError"})
})
  
router.get('/logout' ,(req, res) => {
    res.render('main', {layout: 'logout', user : req.session.user})
})

export {router as usuariosRouter}
