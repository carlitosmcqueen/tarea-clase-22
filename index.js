import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from "connect-mongo";
const app = express();

// SESSION
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


import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app); 
const io = new Server(httpServer);

import randomProductos from "./faker/fakerProductos.js";
import { saveMsjs, getMsjs } from './mongoMensajes/normalizar/mensajes.js';

//USUARIOS
import Usuario from "./src/usuarios.js";
const usuarios = new Usuario();

import isLoggedIn from "./middlewares/log.js"


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

const hbs= handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views/layouts"
    
})

app.engine("hbs",hbs)
app.set("view engine","hbs")



app.get("/", isLoggedIn,(req,res)=>{
    try{
        if (req.session.user){
        res.render("main",{layout:"mensajes", user : req.session.user})
    }else{
        res.redirect("/login")
    }
    
    }catch (error) {
        console.log(error);
    }
   
})

app.get("/login",isLoggedIn, (req,res)=>{
    res.render("main",{layout:"login"})
})
app.post('/login', async (req, res) => {
    const { user, password } = req.body;
    const verificacion = await usuarios.findUser(user, password)
    if (verificacion) {
      req.session.user = user;
      res.redirect('/')
    } else { res.send("Usuario o contraseña incorrecto/s vuelva a intentarlo <a href=/login>Volver al login</a>") }
})

app.get('/register', (req, res) => {
    res.render('main', {layout: 'register'})
})
  
app.post('/register', (req, res) => {
    const { user, password } = req.body;
    usuarios.save({ user, password });
    req.session.user = user;
    res.redirect('/');
})
  
app.get('/logout' ,(req, res) => {

    res.render('main', {layout: 'logout', user : req.session.user})
})
  
  
app.get("/productos-test",isLoggedIn ,async(req,res)=>{
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