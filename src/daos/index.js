import * as dotenv from "dotenv"
dotenv.config()

const daos ={
    MONGO: async()=>{
        const {default: productosDaoMongo} = await import("./productos/productosDao.js")
        const {default: usuariosDaoMongo} = await import("./usuarios/usuariosDao.js")
        const {default: carritoDaoMongo} = await import("./carrito/carritoDao.js")
        const {default: comprasDaoMongo} = await import("./compras/comprasDao.js")
        const {default: mensajesDaoMongo} = await import("./mensajes/mensajesDao.js")
        return{
            productosDao: new productosDaoMongo(),
            usuariosDao: new usuariosDaoMongo(),
            carritoDao: new carritoDaoMongo(),
            compraDao: new comprasDaoMongo(),
            mensajesDao: new mensajesDaoMongo(),
        }
    },
    FS: async()=>{
        const {default: productosDaoFS} = await import("./productos/productosDaoFS.js")
        const {default: carritoDaoFS} = await import("./carrito/carritoDaoFS.js")
        const {default: mensajesDaoFS} = await import("./mensajes/mensajesDaoFS.js")
        return{
            productosDao: new productosDaoFS(),
            carritoDao: new carritoDaoFS(),
            mensajesDao: new mensajesDaoFS(),
        }
    }
}

export default daos[process.env.TIPO]()

