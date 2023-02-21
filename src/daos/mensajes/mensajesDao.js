import ContenedorMongo from "../../contenedores/contenedorMongo.js";

class mensajesDaoMongo extends ContenedorMongo{
    constructor(){
        super("mensajes",{
            author: {
                id: { type: String, required: true, max: 100 },
                timestamp: { type: Date, default: Date.now }
            },
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
} 

export default mensajesDaoMongo