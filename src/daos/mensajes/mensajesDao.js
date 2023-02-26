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
    async saveMsjs(msj){
        try {
            
            const result = await this.db.create(msj);
            return result
        } catch (error) {
            throw new Error(error);
        }
    }

    async getMsjs(){
        try {
            const mensajes = await this.db.find({}).lean()
            return (mensajes);
        } catch (error) {
            throw new Error(error)
        }
    }

    async getByUser(mail){
        try{
            const mensajeUser = await this.db.find({user : mail});
            return mensajeUser
        }catch(error){
            console.error(error)
        }
    }
} 

export default mensajesDaoMongo