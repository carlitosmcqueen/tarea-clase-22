import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
const app = express();


const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
    session({
      secret: "32m32e90me2393",
      store: MongoStore.create({
        mongoUrl: "mongodb+srv://CarlosCoder:coder123@cluster0.tl5cqne.mongodb.net/test",
        mongoOptions: advancedOptions,
      }),
      resave: false,
      saveUninitialized: false,
    })
  );


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


app.get("/prueba", (req, res) => {
    if(req.session.contador) {
        req.session.contador++;
        res.send(`Has accedido ${req.session.contador} veces.`)
    }else{
        req.session.contador = 1;
    res.send(`Bienvenido`);
    }
})
app.get("/",async(req,res)=>{
    res.render("main",{layout:"mensajes"})
    
})
app.get("/productos-test",async(req,res)=>{
    res.render("main",{layout:"productos-test"})
})

io.on("connection", async (socket)=>{
    console.log("se pudo conectar")
    socket.emit('mensajes', await getMsjs());
    socket.on("mensajes", async (msj)=>{
        await saveMsjs(msj)
        io.sockets.emit("mensajes",await getMsjs())

    })
    
    //esto para productos al azar
    socket.emit('randomProducts', randomProductos());


})


httpServer.listen(8080, () => {
    console.log(`HBS iniciado`)
})

// const prueba = 2
// app.engine("hbs",hbs)
// app.set("view engine","hbs")

// app.get("/",async(req,res)=>{

//     try{
//         if (prueba ==2){
//             res.render("main",{layout:"productos-test"})

//         }else{
//             res.render("main",{layout:"mensajes"})
//         }
//     }catch(e){
//         console.log(e)
//     }


    
// })