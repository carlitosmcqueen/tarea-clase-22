import express from "express";
import session from "express-session";
import passport from 'passport';
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
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



import UsuarioDaoMongo from "./src/daos/usuarios/usuariosDao.js";
const usuarios = new UsuarioDaoMongo();

import isLoggedIn from "./middlewares/log.js"



import { Strategy as LocalStrategy } from 'passport-local'
import UsuariosPass from "./src/contenedores/contenedorMongoUsuarios.js"

const app = express();



passport.use("singup",
new LocalStrategy({passReqToCallback: true},(req,username,password,done)=>{
    UsuariosPass.findOne({username},(err,user)=>{
        if(user) return done(null,false)
        UsuariosPass.create(
            {username, password: PassHashed(password)},
            (err,user)=>{
                if (err) return done(err)
                return done(null,user)
            }
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


import randomProductos from "./faker/fakerProductos.js";
import { saveMsjs, getMsjs } from './mongoMensajes/normalizar/mensajes.js';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());




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
app.use("/",usuariosRouter)
app.use("/productos",productosRouter)

app.use((req, res, next) => {
    logger.info(`request ${req.method} at  ${req.url}`)
    next()
})



app.get("/", (req,res)=>{
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

app.post(
    "/login",passport.authenticate("login", { failureRedirect: "/loginError" }),
    (req, res) => {
        const { username } = req.body;
        req.session.user = username;
        res.redirect("/");
    }
);
app.get("/loginError", (req, res) => {
    res.render("main",{layout:"loginError"});
})


app.get('/register', (req, res) => {
    res.render('main', {layout: 'register'})
})
  
app.post('/register', passport.authenticate('singup', { failureRedirect: "/registerError" }), (req, res) => {
    console.log("se registro")
    res.redirect('/');
});

app.get("/registerError",(req, res)=>{
    res.render("main",{layout:"registerError"})
})
  
app.get('/logout' ,(req, res) => {
    res.render('main', {layout: 'logout', user : req.session.user})
})
  
  
app.get("/productos-test",isLoggedIn ,async (req,res)=>{
    res.render("main",{layout:"productos-test"})
})


// ----------------------------------------------------- No se si deberia borrarlo o lo vamos a usar despues por las dudas lo dejo comentado   -------------------------------
// const hola = "hola".repeat(10000)
// // -------------------- Aca la diferencia con Compression ---------------
// app.get("/info",(req, res)=>{
//     //res.send(hola)
//      res.render("main",{layout:"info",
//      args: JSON.stringify(process.argv,null),
//      plataform:process.platform,
//      version:process.version,
//      memory:process.memoryUsage().rss,
//      path: process.cwd(),
//      cpus: cpus().length

//  })
// })

// app.get("/infoCompression", compression(), (req, res)=>{
//     //res.send(hola)
//     res.render("main",{layout:"info",
//     args: JSON.stringify(process.argv,null),
//     plataform:process.platform,
//     version:process.version,
//     memory:process.memoryUsage().rss,
//     path: process.cwd(),
//     cpus: cpus().length

// })
// })

// // ---------- Esto con compresion repetido 10000 veces da una diferencia de 480 b a 1.5 kb




//todo lo que no cae arriba cae aca 
app.all("*",(req,res)=>{
    logger.warn(`Failed Requist ${req.method} at ${req.url}`)
    res.send({error:true})
})



io.on("connection", async (socket)=>{
    console.log("se pudo conectar")
    socket.emit('mensajes', await getMsjs());
    socket.on("mensajes", async (msj)=>{
        await saveMsjs(msj)
        io.sockets.emit("mensajes",await getMsjs())

    })
    socket.emit('randomProducts', randomProductos());
})


const CON_CHILD_PROCESS_FORK = !false;
if (CON_CHILD_PROCESS_FORK) {
  let calculo = fork("./random.js");

  var taskId = 0;
  var tasks = {};

  function addTask(data, callback) {
    var id = taskId++;
    calculo.send({ id: id, data: data });
    tasks[id] = callback;
  }

  calculo.on("message", function (message) {
    tasks[message.id](message);
  });

  app.get("/randoms", async (req, res) => {
    addTask(req.query.cant || 1000, (randoms) => {
      res.json(randoms);
    });
  });

} else {
  app.get("/randoms", async (req, res) => {
    res.send('<h2>por si no funca</h2>');
  });
}

// aca borre lo que tenia antes y dejo este que creo q es lo que pide la consigna

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
})

server.on('error', error => console.log(`Error en servidor ${error}`))