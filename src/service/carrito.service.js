import daos from "../daos/DaoFactory.js"
const {carritoDao,productosDao,usuariosDao} = await daos
import * as dotenv from "dotenv"

dotenv.config()

export const GET = async (req, res) => {
    try {
        const data = await carritoDao.getAll()
        res.status(200).send(data)
    } catch (err) {
        res.status(404).send(err);
    }
}
export const GETbyID = async (req, res) => {
    try {
        const {id} = req.params;
        let data = await carritoDao.getById(id);
        res.status(200).send(data)
    } catch (err) {
        res.status(404).send(err);
    }
}

export const POSTCART = async (req, res) => {
    try {        
        await carritoDao.createCart();
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}
export const POSTPRODUCT = async (req, res) => {
    try {
        const {
            id,
            id_producto
        } = req.params;

        const productoCarrito = await productosDao.getById(id_producto);
        const data = await carritoDao.addProduct(id, productoCarrito)
        res.status(200).send(data)
    } catch (err) {
        res.status(404).send(err);
    }
}
export const POSTPRODUCTACTIVE = async (req, res) => {
    try {
        const {id_producto} = req.params
        const dataInfo = await usuariosDao.IdUser(req.session.user)
        const superId = dataInfo.carrito[0]._id
        const productoCarrito = await productosDao.getById(id_producto);
        const data = await carritoDao.addProduct(superId, productoCarrito)
        res.status(200).send(data)
    }catch(e){
        res.status(404).send(e)
    }
}

export const DELETEPRODUCTACTIVE = async (req, res) => {
    try{
        const {id_producto} = req.params
        const dataInfo = await usuariosDao.IdUser(req.session.user)
        const superId = dataInfo.carrito[0]._id
        const productoCarrito = await productosDao.getById(id_producto)
        const data = await carritoDao.deleteProdById(superId,productoCarrito)
        res.status(200).send(data)
    }catch(e){

    }
    
}

export const PUTCART = async (req, res) => {
    try {
        const {id} = req.params;
        const prodNuevo = req.body;
        carritoDao.updateById(id, prodNuevo);
        res.status(200).send(`se actualizo el producto`);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const DELETEPRODUCT = async (req, res) =>{
    try {
        const { id, id_prod } = req.params;
        const productoCarrito = await productosDao.getById(id_prod)
        await carritoDao.deleteProdById(id, productoCarrito);
        res.status(200).send("Producto Eliminado");
    } catch (err) {
        res.status(404).send(err);
    }
}
