import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import logger from "../../../logs.js"


class comprasDaoMongo extends ContenedorMongo{
    constructor(){
        super("compra",{
        
            timestamp: { type: String, required: true, default: new Date() },
            carrito:{type:Array}
        })
        
    }

    async crearCompra(){
        try{
            const compra = await this.db.create({carrito:[]})
            logger.info("se creo la compra")
            return compra
        }catch(error){
            logger.error(`error al crear compra: ${error}`)
        }
        
    }

    async llenarCompra(id,carrito){
        try{
            const result = await this.db.updateOne({_id:id},{$push:{carrito:carrito}}).lean()
            logger.info("se lleno la compra")
            return result
        }catch(e){
            logger.error(`error al llenar la compra: ${error}`)
        }
    }
}
export default comprasDaoMongo;