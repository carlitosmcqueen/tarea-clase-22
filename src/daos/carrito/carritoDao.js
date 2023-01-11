import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class carritoDaoMongo extends ContenedorMongo{
    constructor(){
        super("carrito",{productos:Array})
    }
    async createCart() {
        try {
            const cart = await this.db.create({ productos: [] })
            return cart;
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(id, ProductoCompleto) {
        try {
            const result = await this.db.updateOne({ _id: id }, { $push: { productos: ProductoCompleto } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}
export default carritoDaoMongo



