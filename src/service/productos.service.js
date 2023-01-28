import daos from "../daos/index.js";
const {productosDao} = await daos
import { guardarProducto } from "../dto/productos.dto.js";
import {enviarProducto} from "../dto/productos.dto.js";

export const GET = async (req, res) => {
    try {
        const data = await productosDao.getAll()
        let productos = data.map(producto => new enviarProducto(producto))
        res.send(productos);
        
    } catch (err) {
        res.status(404).send(err);

    }
}

export const GETbyID = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.getById(id);
        let producto = data.map(producto => new enviarProducto(producto))
        console.log(producto);
        res.send(producto);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const POST = async (req, res) => {
    try {
        const data = req.body;
        await productosDao.save(data);
        let producto = data.map(producto => new guardarProducto(producto))
        res.send(producto)

    } catch (err) {
        res.status(404).send(err);

    }
}

export const PUT = async (req, res) => {
    try {
        const {id} = req.params;
        const {title,price,description,thumbnail} = req.body;
        const idInt = parseInt(id);
        await productosDao.updateById(idInt, title, price, description, thumbnail)
        res.send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err);

    }
}
export const DELETE = async (req, res) => {
    try {
        const {id} = req.params;
        await productosDao.deleteById(id);
        res.send(`El producto con id ${id} fue eliminado`);
    } catch (err) {
        res.status(404).send(err);


    }
}