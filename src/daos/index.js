import * as dotenv from "dotenv"
dotenv.config()

const daos ={
    mongo: async()=>{
        const {default: productosDaoMongo} = await import("./productos/productosDao.js")
        const {default: usuariosDaoMongo} = await import("./usuarios/usuariosDao.js")
        const {default: carritoDaoMongo} = await import("./carrito/carritoDao.js")
        const {default: comprasDaoMongo} = await import("./compras/comprasDao.js")
        return{
            productosDao: new productosDaoMongo(),
            usuariosDao: new usuariosDaoMongo(),
            carritoDao: new carritoDaoMongo(),
            compraDao: new comprasDaoMongo(),
        }
    }
}

export default daos[process.env.TIPO]()
