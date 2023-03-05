import ContenedorFS from "../../contenedores/contenedorFS.js"

class ProductosDaoFS extends ContenedorFS {
    constructor(){
        super("./data/productos.json")
    }
}
export default ProductosDaoFS