import * as dotenv from "dotenv"
dotenv.config()

const daos ={
    mongo: async()=>{
        const {default: productosDaoMongo} = await import("./productos/productosDao.js")
        const {default: usuariosDaoMongo} = await import("./usuarios/usuariosDao.js")
        return{
            productosDao: new productosDaoMongo(),
            usuariosDao: new usuariosDaoMongo()

        }
    }
}

export default daos[process.env.TIPO]
