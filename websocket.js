import express from "express";


const app = express();

import daos from "./src/daos/index.js"
const { mensajesDao } = await daos

import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app); 
const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))
app.get("/", (req, res) =>{
    
})

io.on("connection", async (socket) => {
    console.log("se conecto a chatSocket")
    socket.emit("mensajes", await mensajesDao.getMsjs())
    socket.on("mensajes", async (msj) => {
        await mensajesDao.saveMsjs(msj)
        io.sockets.emit("mensajes", await mensajesDao.getMsjs())
    })
})

httpServer.listen(8080, () => {
    console.log(`HBS iniciado`)
})