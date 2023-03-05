import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class mensajesDaoMongo extends ContenedorMongo{
    constructor(){
        super("mensajes",{
            user: { type: String, required: true, max: 100 },
            timestamp: { type: Date, default: Date.now },
            to: {type: String, default:"ALL"},
            text: { type: String, required: true, max: 400 }
        })
    }

    saveMsjs = async (msj)=>{
        try {
            const result = await this.db.create(msj);
            return result
        } catch (error) {
            throw new Error(error);
        }
    }
    getMsjs = async()=>{
        try {
            const mensajes = await this.db.find({}).lean()
            return mensajes
        } catch (error) {
            throw new Error(error)
        }
    }
    getByUser= async (mail)=>{
        try{
            const mensajeUser = await this.db.find({user : mail}).lean()
            return mensajeUser
        }catch(error){
            return "error al obtener usuario"
        }
    }
} 

export default mensajesDaoMongo