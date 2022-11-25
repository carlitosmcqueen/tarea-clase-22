import express from "express";
import session from "express-session";
import handlebars from "express-handlebars";
import MongoStore from 'connect-mongo';
import bcrypt from 'bcrypt';
import passport from 'passport';

const app = express();


//PASSPORT 
import { Strategy as LocalStrategy } from 'passport-local'
import UsuariosPass from "./src/contenedores/contenedorMongoUsuarios.js"

passport.use("singup",
new LocalStrategy({passReqToCallback: true},(req,username,password,done)=>{
    UsuariosPass.findOne({username},(err,user)=>{
        if(user) return done(null,false)
        UsuariosPass.create(
            {username,password: PassHashed(password)},
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


app.use(passport.initialize());
app.use(passport.session());





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

//-------------SERVER-------------
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



//----------------VISTAS---------------

app.get("/",(req,res)=>{
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
    // const { user, password } = req.body;
    // const verificacion = await usuarios.findUser(user, password)
    // if (verificacion) {
    //   req.session.user = user;
    //   res.redirect('/')
    // } else { res.send("Usuario o contraseña incorrecto/s vuelva a intentarlo <a href=/login>Volver al login</a>") }

    passport.authenticate("login",{failureRedirect:"/faillogin"})

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

