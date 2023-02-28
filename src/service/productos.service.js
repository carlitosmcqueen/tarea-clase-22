import daos from "../daos/index.js";
const {productosDao,mensajesDao} = await daos
import { guardarProducto } from "../dto/productos.dto.js";
import {enviarProducto} from "../dto/productos.dto.js";

export const GET = async (req, res) => {
    try {
        const data = await productosDao.getAll()
        res.status(200).send(data);        
    } catch (err) {
        res.status(404).send(err);

    }
}

export const GETbyID = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.getById(id);
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const GETbyCategory = async (req, res) => {
    try{
        const {category} = req.params
        const data = await productosDao.getByCategory(category)
        res.send(data)
    }catch(err){
        res.send(err)
    }
}

export const POST = async (req, res) => {
    try {
        const {title,price,thumbnail,description,category} = req.body;
        const producto =  new guardarProducto({title,price,thumbnail,description,category})
        await productosDao.save(producto);
        res.status(201).send(producto);
        
    } catch (err) {
        res.status(404).send(err);
    }
}

export const PUT = async (req, res) => {
    try {
        const {title,price,thumbnail,description} = req.body;
        const {id} = req.params;
        const productoMod = new guardarProducto({title,price,thumbnail,description,category})
        const idInt = parseInt(id);
        const productoUpdate = {id,...productoMod}
        await productosDao.updateById(id,productoUpdate)

        res.status(200).send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err);

    }
}
export const DELETE = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.deleteById(id);
        if(data){
            res.status(200).send(`El producto con id ${id} fue eliminado`);
        }else{
            res.status(404).send({err: "producto no encontrado"})
        }
    } catch (err) {
        res.status(404).send(err);

    }
}