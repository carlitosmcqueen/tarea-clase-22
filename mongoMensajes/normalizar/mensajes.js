import config from '../../mongoConfig.js';
import mongoose from 'mongoose';
import { normalizeMsj } from './normalizr.js';
import logger from "../../logs.js"
mongoose.set('strictQuery', true);

try {
    mongoose.connect(config.mongo.url, config.mongo.options)
    console.log("se conecto MongoMensajes");
} catch (error) {
    logger.error("Error al recibir los mensajes")
};

const mongooseSchema = new mongoose.Schema({
    author: {
        id: { type: String, required: true, max: 100 },
        timestamp: { type: Date, default: Date.now }
    },
    text: { type: String, required: true, max: 400 }
});

const msjModel = mongoose.model('mensajes', mongooseSchema);


const saveMsjs = async (msj) => {
    const newMsj = new msjModel(msj);
    try {
        newMsj.save()
    } catch (error) {
        throw new Error(error);
    }
}

const getMsjs = async () => {
    try {
        const mensajes = await msjModel.find();
        return normalizeMsj(mensajes);
    } catch (error) {
        throw new Error(error);
    }
}

export { saveMsjs, getMsjs };