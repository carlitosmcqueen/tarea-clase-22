import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class comprasDaoMongo extends ContenedorMongo{
    constructor(){
        super("compra",{
            costumerId : String,
            carrito:{type:Array}
        })
        
    }

    async crearCompra(){
        const compra = await this.db.create({comprardor:{}})
        return compra
    }

    async llenarCompra(id,carrito){
        try{
            const result = await this.db.updateOne({_id:id},{$push:{carrito:carrito}})
            return result
        }catch(e){
            console.log(e) 
        }
    }
}
export default comprasDaoMongo;