import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import logger from "../../../logs.js"

class carritoDaoMongo extends ContenedorMongo{
    constructor(){
        super("carrito",{productos:Array})
    }
    async createCart() {
        try {
            const cart = await this.db.create({productos:[]})
            logger.info("se creo el carrito")
            return cart;
        } catch (err) {
            logger.error(`error al crear carrito: ${err}`)
        }
    }

    async addProduct(id, ProductoCompleto) {
        try {
            const carrito = await this.db.find({_id:id})
            let product = carrito[0].productos
            console.log(ProductoCompleto._id)
            let productList = product.find(product => product._id == ProductoCompleto._id);


            // if (product.hasOwnProperty(ProductoCompleto._id)) {
            //      let cant = product[ProductoCompleto._id].cant + 1
            //     let nuevo = { ProductoCompleto, cant }
            //     product[ProductoCompleto._id] = nuevo
            // } else {
            //     let nuevo = { ProductoCompleto, cant: 1 }
            //     product[ProductoCompleto._id] = nuevo
            // }
            const result = await this.db.updateOne({ _id: id }, { $push: { productos: ProductoCompleto, cant:1} })
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



