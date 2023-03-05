import ContenedorFS from "../../contenedores/contenedorFS.js"
import fs from "fs";

class CarritoDaoFS extends ContenedorFS {
    constructor(){
        super("./data/carrito.json")
    }

    createCart =  () => {
        try {
            const data = fs.readFileSync(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            const id = dataParseada.length +1

            const productos = []
            const producto = {id,productos}
            dataParseada.push(producto)
            fs.writeFileSync(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return id

        }catch (error) {
            console.log(error)
        }
    }

    addProduct = async (id, ProductoCompleto)=>{
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            
            let carrito = dataParseada.find((obj) => obj.id == id)
            carrito.productos.push(ProductoCompleto)
            await fs.promises.writeFile(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return "se agrego al carrito" 
        }catch(error){
            return "no se pudo agregar al carrito"
        }
    }
    deleteProdById = async (id,ProductoCompleto) =>{
        try{
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const dataParseada = JSON.parse(data)
            let carrito = dataParseada.find((obj)=> obj.id == id)
            let productos = carrito.productos.filter((obj)=>obj.id != ProductoCompleto.id)
            carrito.productos = productos
            fs.promises.writeFile(`${this.archivo}`,JSON.stringify(dataParseada,null, 2))
            return "se ha logrado eliminar el producto"
        }catch (error) {
            return "error al borrar el producto"
            
        }
    }
}
export default CarritoDaoFS
