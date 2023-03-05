import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class productosDaoMongo extends ContenedorMongo{
    constructor(){
        super("productos",{
            title: {type:String,required:true},
            price: {type:Number,required:true},
            thumbnail: {type:String,required:true},
            description: {type:String,required:true},
            category:{type:String,required:true}
        })
    }
    
    async getByCategory(category){
        try {
            const result = await this.db.find({ category: category })
            return result;
        } catch (error) {
            logger.error(`error al obtener el dato por su id: ${error}`)

        }
    } 
}


export default productosDaoMongo;