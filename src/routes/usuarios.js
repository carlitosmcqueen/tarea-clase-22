import express from 'express'
import { Router } from 'express'

//nuevo intento 
import passport from '../utils/passport.js'

import authMw from "../../middlewares/log.js";
import twilio from 'twilio';
import * as dotenv from "dotenv"
dotenv.config()

//twilio
const accountSID = "AC68263a028427d38a73d6e3d832cdc0ae"
const authToken = process.env.TWILIO
const client = twilio(accountSID, authToken)

const router = Router()
const app = express()
app.use(express.json())



app.use(passport.initialize());
app.use(passport.session());

// ---------------------------------------------------------- para los loguearte  -------------------------------
router.get("/login", async (req,res)=>{
    res.render("main",{layout:"login"})

})

router.post(
    "/login",passport.authenticate("login", { failureRedirect: "/loginError" }),
    async (req, res) => {
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
  
router.post('/register', passport.authenticate('signup', { failureRedirect: "/registerError" }), (req, res) => {
    res.redirect("/login")
});

router.get("/registerError",(req, res)=>{
    res.render("main",{layout:"registerError"})
})
  
router.get('/logout' ,(req, res) => {
    res.render('main', {layout: 'logout', user : req.session.user})
    if(req.session){
        req.session.destroy();
    }
})


export {router as usuariosRouter}
