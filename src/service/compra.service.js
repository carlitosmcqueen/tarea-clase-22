import daos from '../daos/index.js';
import { createTransport } from 'nodemailer';

const {compraDao,carritoDao} = await daos

export const GET = async (req,res) => {
    try{
        console.log(req.session.user)
        const data = await compraDao.getAll()
        res.status(200).send(data);
    }catch(err) {
        res.status(404).send(err);
    }
}
export const GETbyID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await compraDao.getById(id);
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}
export const POSTCOMPRA = async (req, res) => {
    try {
        const data =await compraDao.crearCompra();
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const POSTCARRITOinCOMPRA = async (req, res) => {
    try {
        const {
            id,
            id_carrito
        } = req.params;
        const carritoCompra = await carritoDao.getById(id_carrito);
        const productosCarrito = carritoCompra.productos
        const data =await compraDao.llenarCompra(id, carritoCompra)


        res.status(200).send(data)
        
    } catch (err) {
        res.status(404).send(err);

    }
}


