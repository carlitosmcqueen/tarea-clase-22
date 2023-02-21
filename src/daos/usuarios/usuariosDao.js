import { passHashed,validatePass  } from "../../utils/bcrypt.js";
import mail from "../../utils/nodemailer.js"
import logger from "../../../logs.js";
import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class UsuarioDaoMongo extends ContenedorMongo {
    constructor() {
        super("usuarios", {
            username: String,
            password: String,
            edad:Number,
            telefono:String,
            imagen:String,
        });
    }

    // async findUserByName(username) {
    //      try{
    //          const user = await this.db.find({ username });
    //          logger.info("se encontro la usuario")
    //          return user;
    //      }catch(err){
    //          logger.error(`error al buscar usuario: ${err}`)
    //      }
    // }
    // async findUser(username, password) {
    //     try {
    //         const result = await this.db.find({ username, password });
    //         if (result.length == 0) {
    //             throw new Error("Usuario o contraseña incorrectos");
    //         } else {
    //             const user = result[0];
    //             logger.info("se encontro al usuario")
    //             return user;
    //         }
    //     } catch (error) {
    //         logger.error(`error al buscar usuario: ${error}`)
    //     }
    // }
    async register (req,username,password,done) {
        try{
            const {edad,telefono,imagen} = req.body
            const user = await this.db.findOne({username})
            if(user) return done(null,false)
            const saveUser = await this.db.create({username,password: passHashed(password),edad,telefono,imagen})
            mail("registro",saveUser)
            done(null,saveUser)
        }catch(err){
            logger.error("error al registrar usuario")
        }



    }
    async login (username,password,done){
        try{
            const user = await this.db.findOne({username})
            if(!user) return done(null,false)
            validatePass(password,user.password) ? done(null,user) : done(null,false)
        }catch(err){
            logger.error("error al loguear")
        }
    }

    async find(id,done){
        try{
            this.db.findById(id,done)
            
        }catch(err){
            logger.error("error al deserialiar")
        }
    }
}

export default UsuarioDaoMongo;