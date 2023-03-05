import mongoose from "mongoose";
import config from "../../mongoConfig.js";
import logger from "../../logs.js";
import ContenedorFactory from "./contenedorFactory.js";

mongoose.set('strictQuery', false)

await mongoose.connect(config.mongo.url, config.mongo.options)

class ContenedorMongo extends ContenedorFactory{
    
    constructor(coleccion,esquema){
        super()
        this.db = mongoose.model(coleccion,esquema)
    }
    save = async (data)=>{
        try {
            const result = await this.db.create(data);
            return result;
            
        } catch (error) {
            logger.error(`error al guardar archivo: ${error}`)
        }
    }
    getAll= async()=>{
        try {
            const result = await this.db.find({}).lean()
            return result;
        } catch (error) {
            logger.error(`error al obtener todos los datos  : ${error}`)
        }
    }
    getById = async(id)=>{
        try {
            const result = await this.db.findOne({ _id: id }).lean()
            return result;
        } catch (error) {
            logger.error(`error al obtener el dato por su id: ${error}`)
        }
        
    }
    updateById = async(id, data) => {
        try {
            const result = await this.db.updateOne({ _id: id }, { $set: data }).lean()
            return result;
        } catch (error) {
            logger.error(`error al actualizar por id: ${error}`)
        }

    }
    
    deleteById = async (id)=> {
        try {
            const result = await this.db.deleteOne({ _id: id }).lean()
            return result;
        } catch (error) {
            logger.error(`error al borrar por su id: ${error}`)
        }
    }
    deleteAll = async ()=> {
        try{
            await this.db.deleteMany({}).lean()
        }catch(error) {
            logger.error(`error al borrar: ${error}`)

        }
    }
}
export default ContenedorMongo