import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import logger from "../../../logs.js"

class carritoDaoMongo extends ContenedorMongo{
    constructor(){
        super("carrito",{usuario:String,productos:Array})
    }
    async createCart() {
        try {
            const cart = await this.db.create({usuario},{ productos: [] }).lean()
            logger.info("se creo el carrito")
            return cart;
            
        } catch (err) {
            logger.error(`error al crear carrito: ${err}`)

        }
    }

    async addProduct(id, ProductoCompleto) {
        try {
            const result = await this.db.updateOne({ _id: id }, { $push: { productos: ProductoCompleto } }).lean()
            logger.info("se agrego el productos al carrito")
            return result;
        } catch (error) {
            logger.error(`error al añadir producto al carrito: ${error}`)

        }
    }

    async deleteProdById(id, ProductoCompleto){
        try{
            const result = await this.db.updateOne({_id:id},{$pull:{productos:ProductoCompleto}}).lean()
            logger.info("se borro el producto del carrito")
            return result
        }catch(error){
            logger.error(`error al borrar producto del carrito: ${error}`)

        }
    }
}
export default carritoDaoMongo



