import express from 'express'
import { Router } from 'express'
//nuevo intento 

import passport from '../utils/passport.js'
import * as UsuariosService from "../service/usuario.service.js";


const router = Router()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());
// ---------------------------------------------------------- para los loguearte  -------------------------------
router.get("/login", UsuariosService.GETLOGIN)

router.post("/login",passport.authenticate("login", { failureRedirect: "/loginError" }),UsuariosService.POSTLOGIN)

router.get("/loginError", UsuariosService.LOGINERROR)

router.get('/register', UsuariosService.GETREGISTER)
  
router.post('/register', passport.authenticate('signup', { failureRedirect: "/registerError" }), UsuariosService.POSTREGISTER);

router.get("/registerError",UsuariosService.REGISTERERROR)
  
router.get('/logout' ,UsuariosService.LOGOUT)


export {router as usuariosRouter}
