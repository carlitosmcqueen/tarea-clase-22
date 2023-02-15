import express from "express";
import handlebars from "express-handlebars";
import bodyParser from 'body-parser';
import session from "express-session";
import MongoStore from "connect-mongo";
import isLoggedIn from "./middlewares/log.js";
import { cpus } from "os";
import cluster from 'cluster';

//logger
import logger from "./logs.js"
//compression
import compression from "compression"
import {fork} from "child_process"
import Yargs from "yargs/yargs";


const yargs = Yargs(process.argv.slice(2))

const port = yargs.alias({
    p:"puerto",
    m:"modo"
}).default(
    {puerto:8080,modo:"fork"}
).argv


const app = express();
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(session({
    secret: "32m32e90me2393",
    resave: true,
    cookie:{maxAge: 60000},
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://CarlosCoder:coder123@cluster0.tl5cqne.mongodb.net/test",
      mongoOptions: advancedOptions,
    }),
  })
)


//-------------SERVER-------------


import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app); 
const io = new Server(httpServer);


//import randomProductos from "./src/utils/faker/fakerProductos.js";
// import { saveMsjs, getMsjs } from './mongoMensajes/normalizar/mensajes.js';




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

app.use("/",usuariosRouter)
app.use("/api/productos",productosRouter)
app.use("/api/carrito",carritoRouter)
app.use("/api/compra",compraRouter)


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

app.get("/productos-test",isLoggedIn ,async (req,res)=>{
    res.render("main",{layout:"productos-test"})
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

//export default httpServer