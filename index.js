import express from "express";
import handlebars from "express-handlebars";
import bodyParser from 'body-parser';
import session from "express-session";
import passport from "passport";

import sessionConfig from "./src/utils/session.js"
import daos from "./src/daos/index.js"
const {mensajesDao} = await daos

import * as dotenv from "dotenv"
dotenv.config()

import logger from "./logs.js"



const app = express();
app.use(session(sessionConfig))

//-------------SERVER-------------


import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app); 
const io = new Server(httpServer);


io.on("connection", async (socket) => {
    console.log("se conecto a chatSocket")

    socket.emit("mensajes", await mensajesDao.getMsjs())
    socket.on("mensajes", async (msj) => {
        await mensajesDao.saveMsjs(msj)
        io.sockets.emit("mensajes", await mensajesDao.getMsjs())
    })
})

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))



const hbs= handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views/layouts"
    
})
app.engine("hbs",hbs)
app.set("view engine","hbs")

//----------------VISTAS---------------
// aca cae donde todas las que no tiene link 

import { productosRouter } from "./src/routes/productos.js";
import { usuariosRouter } from "./src/routes/usuarios.js";
import { carritoRouter } from "./src/routes/carrito.js";
import {compraRouter} from "./src/routes/compra.js";
import {mensajesRouter} from "./src/routes/mensajes.js";

app.use("/",usuariosRouter)
app.use("/api/productos",productosRouter)
app.use("/api/carrito",carritoRouter)
app.use("/api/compra",compraRouter)
app.use("/chat",mensajesRouter)


app.use((req, res, next) => {
    logger.info(`request ${req.method} at  ${req.url}`)
    next()
})


app.get("/", (req,res)=>{
    try{
        if (req.session.user){
        res.render("main",{layout:"principal", user : req.session.user})
    }else{
        res.redirect("/login")
    }
    }catch (error) {
        console.log(error);
    }
})
app.get("/user",(req,res)=>{
    console.log(req.user)
})

//todo lo que no cae arriba cae aca 
app.all("*",(req,res)=>{
    logger.warn(`Failed Requist ${req.method} at ${req.url}`)
    res.send({error:true})
})


const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT, () => {
     console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))

