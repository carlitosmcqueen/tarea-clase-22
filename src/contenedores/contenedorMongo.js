import mongoose from "mongoose";
import config from "../../mongoConfig.js";

import logger from "../../logs.js";



await mongoose.connect(config.mongo.url, config.mongo.options)


class ContenedorMongo {
    
    constructor(coleccion,esquema){
        this.db = mongoose.model(coleccion,esquema)
    }

    async save(data) {
        try {
            const result = await this.db.create(data);
            return result;
            
        } catch (error) {
            logger.error(`error al guardar archivo: ${error}`)
        }
    }

    async getAll() {
        try {
            const result = await this.db.find({}).lean()
            return result;
        } catch (error) {
            logger.error(`error al obtener todos los datos  : ${error}`)
        }
    }

    async getById(id) {
        try {
            const result = await this.db.findOne({ _id: id }).lean()
            return result;
        } catch (error) {
            logger.error(`error al obtener el dato por su id: ${error}`)

        }
    }
    async updateById(id, data) {
        try {
            const result = await this.db.updateOne({ _id: id }, { $set: data }).lean()
            return result;
        } catch (error) {
            logger.error(`error al actualizar por id: ${error}`)

        }
    }

    async deleteById(id) {
        try {
            const result = await this.db.deleteOne({ _id: id }).lean()
            return result;
        } catch (error) {
            logger.error(`error al borrar por su id: ${error}`)

        }
    }
    async deleteAll() {
        try{
            await this.db.deleteMany({}).lean()
        }catch(error) {
            logger.error(`error al borrar: ${error}`)

        }
        
    }
    
}

export default ContenedorMongo