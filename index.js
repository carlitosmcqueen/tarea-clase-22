import express from "express";
import handlebars from "express-handlebars";
const app = express();

import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app); 
const io = new Server(httpServer);

import randomProductos from "./faker/fakerProductos.js";
import { saveMsjs, getMsjs } from './mongoMensajes/normalizar/mensajes.js';


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

const hbs= handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views/layouts"
    
})

app.engine("hbs",hbs)
app.set("view engine","hbs")

app.get("/",async(req,res)=>{
    res.render("main",{layout:"mensajes"})
})
app.get("/productos-test",async(req,res)=>{
    res.render("main",{layout:"productos-test"})
})

io.on("connection", async (socket)=>{
    console.log("se pudo conectar")
    socket.on("enviarMensaje",(msj)=>{
        saveMsjs(msj)
    })
    socket.emit('mensajes', await getMsjs());
    
    //esto para productos al azar
    socket.emit('randomProducts', randomProductos());


})



httpServer.listen(8080, () => {
    console.log(`HBS iniciado`)
})