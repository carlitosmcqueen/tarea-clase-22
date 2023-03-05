import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import logger from "../../../logs.js"


class carritoDaoMongo extends ContenedorMongo{
    constructor(){
        super("carrito",{
          productos:Array,
      })
    }

    createCart = async() =>{
      try {
        const cart = await this.db.create({productos:[]})
        logger.info("se creo el carrito correctamente")
        return cart;
      }catch (err) {
        logger.error(`error al crear carrito: ${err}`)
      }
    } 

    addProduct = async (id, ProductoCompleto) => {
      try {
        const carrito = await this.db.findOne({ _id: id})
        let productList = carrito.productos.find((product) => product.title === ProductoCompleto.title)
        if (productList) {
          productList.cant += 1;
        } else {
          ProductoCompleto.cant = 1;
          carrito.productos.push(ProductoCompleto);
        }
        const result = await this.db.updateOne({ _id: id },{ productos: carrito.productos }).lean()
        logger.info("se agrego el producto al carrito");
        return result
      }catch (error) {
        logger.error(`error al añadir producto al carrito: ${error}`)
      }
    }

    deleteProdById = async (id,ProductoCompleto) =>{
      try{
        const carrito = await this.db.findOne({ _id: id })
        let productList = carrito.productos.find( (product) => product.title === ProductoCompleto.title)
        if(productList){
          productList.cant -= 1;
          await this.db.updateOne({_id:id},{productos:carrito.productos}).lean()
          logger.info(`se elimino un elemento del producto del ${ProductoCompleto.title}`)
          return `se elimino un elemento del producto del ${ProductoCompleto.title}`
        }
        if(productList.cant == 0){
          await this.db.updateOne({_id:id},{$pull:{productos:ProductoCompleto}}).lean()
          logger.info("se borro el producto del carrito")
          return `se borro el producto del carrito`
        }
      }catch(error){
        logger.error(`error al borrar producto del carrito: ${error}`)
      } 
    }

    deleteAllProducts = async (id)=>{
      try{
        await this.db.updateOne({_id:id}, {$set :{productos:[]}}).lean()
        return `se borraron todos los productos del carrito`
      }catch(e){
        logger.error(`error al borrar todos los productos del carrito :${e}`)
      }
    }

}
export default carritoDaoMongo



