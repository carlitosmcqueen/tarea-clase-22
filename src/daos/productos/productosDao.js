import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class productosDaoMongo extends ContenedorMongo{
    constructor(){
        super("productos",{
            title: {type:String,required:true},
            price: {type:Number,required:true},
            thumbnail: {type:String,required:true},
            description: {type:String,required:true}
        })
    }
}

export default productosDaoMongo;