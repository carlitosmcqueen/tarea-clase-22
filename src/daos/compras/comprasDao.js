import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import mail from "../../utils/nodemailer.js"
import logger from "../../../logs.js"


class comprasDaoMongo extends ContenedorMongo{
    constructor(){
        super("compra",{
            user:{type:String, required:true},
            idUser: {type: String},
            timestamp: { type: String, required: true, default: new Date() },
            estado:{type:String,default:"generada"},
            productos:{type:Array},
            domicilio:{type:String,required:true}
        })
        
    }

    async crearCompra(user,idUser,prod,domicilio){
        try{
            const compra = await this.db.create({user:user,idUser:idUser,productos:prod, domicilio})
            logger.info("se creo la compra")
            mail("compra",compra)
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
    async getByUser(user){
        try {
            const result = await this.db.find({ user: user })
            logger.info("se obtuvo el usuario")
            return result;
        } catch (error) {
            logger.error(`error al obtener el dato por su id: ${error}`)

        }
    } 

    async deleteCompra (id) {
        try {
            const result = await this.db.deleteOne({_id: id}).lean()
            logger.info(`se borro correctamente la compra ${id}`)
            return result
        }catch(e){
            logger.error(`error al borrar el carrito : ${e}`)
        }
    }
}
export default comprasDaoMongo;