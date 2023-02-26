import express from 'express'
import { Router } from 'express'
import daos from "../daos/index.js"
const {usuariosDao,mensajesDao} = await daos
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
    try{
        console.log("nice")
    }catch(e){
        console.error(e)

    }
    res.redirect('/');
});

router.get("/registerError",(req, res)=>{
    res.render("main",{layout:"registerError"})
})
  
router.get('/logout' ,(req, res) => {
    res.render('main', {layout: 'logout', user : req.session.user})
})


// -------------------------------------- aca las vistas de carrito y productos
router.get("/productos",authMw,(req, res)=>{
    res.render('main', {layout: 'productos',user: req.session.user})

})


router.get("/carrito",(req, res)=>{
    res.render('main', {layout: 'carrito',user: req.session.user})
    
})
router.get("/chat",async (req, res)=>{
    const usuarios = await usuariosDao.getAll()
    const usuariosData = usuarios.map(obj => obj.username)
    res.render('main', {layout: 'mensajes',user: req.session.user, usuarios: usuariosData})
})
router.get("/chat/:mail",async(req, res) => {
    const {mail} = req.params
    const data = await mensajesDao.getByUser(mail)
    res.status(200).send(data);

})


export {router as usuariosRouter}
