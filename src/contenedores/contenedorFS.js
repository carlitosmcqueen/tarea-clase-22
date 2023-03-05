import fs from "fs"

class ContenedorFS{
    constructor(archivo){
        this.archivo = archivo
    }
    save = async (producto)=>{
        try{
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            producto.id = id;
            productos.push(producto);
            const productosString = JSON.stringify(productos);
            await fs.promises.writeFile(`${this.archivo}`, productosString)
            return producto
        }catch(e){
            console.log(e);
        }
    }

    getAll = async ()=>{
        try {
            const info = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const infoParse = JSON.parse(info)
            return infoParse
        }catch(error) {
            return `error : ${error}`
        }
    }
    getById = async (id)=>{
        const objs = await this.getAll()
        const buscado = objs.find(o => o.id == id)
        return buscado
    }
    updateById = async (id,data) => {
        try{
            const info = await fs.promises.readFile(`${this.archivo}`,"utf-8")
            let infoParse = JSON.parse(info)
            let infoViejo = infoParse.find(((obj)=> obj.id == id))
            if(infoViejo === undefined){
                throw{
                    msg: "404 not found"
                }
            }
            let infoFilter = infoParse.filter((obj)=> obj.id !==id)
            infoViejo={
                id,
                ...data
            }
            infoFilter.push(infoViejo)
            fs.writeFileSync(`${this.archivo}`,JSON.stringify(infoFilter,null,2))
            return "se actualizo la info"
        }catch(error){
            return `error al actualizar: ${error}`
        }
    }

    deleteById = async (id) => {
        try {
            const info = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const infoParse = JSON.parse(info);
            const arrayBorrado = infoParse.filter((item) => item.id != id)
            const verricar = infoParse.find((item) => item.id == id);
            if (verricar) {
                await fs.promises.writeFile(`${this.archivo}`, JSON.stringify(arrayBorrado))
                return "se borro el archivo correctamente"
            } else {
                return "no se encontro el archivo"
            }

        } catch (error) {
            return "error el leer el archivo borrado por id"
        }
    }

}

export default ContenedorFS