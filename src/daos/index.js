import * as dotenv from "dotenv"
dotenv.config()
console.log(process.env.TIPO)
const daos ={
    mongo: async()=>{
        const {default: productosDaoMongo} = await import("./productos/productosDao.js")
        const {default: usuariosDaoMongo} = await import("./usuarios/usuariosDao.js")
        const {default: carritoDaoMongo} = await import("./carrito/carritoDao.js")
        return{
            productosDao: new productosDaoMongo(),
            usuariosDao: new usuariosDaoMongo(),
            carritoDao: new carritoDaoMongo(),
        }
    }
}

export default daos[process.env.TIPO]
