import mongoose from "mongoose";
import config from "../../mongoConfig.js";

await mongoose.connect(config.mongo.url, config.mongo.options)

const UsuariosPass = mongoose.model("users", {
    username: String,
    password: String,
    edad:Number,
    telefono:String,
    imagen:String,

});

export default UsuariosPass

