import daos from "../daos/index.js"
const {carritoDao,productosDao,compraDao} = await daos
import twilio from "twilio"
import * as dotenv from "dotenv"

dotenv.config()

const accountSID = "AC68263a028427d38a73d6e3d832cdc0ae"
const authToken = process.env.TWILIO
const client = twilio(accountSID, authToken)

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
        const data = req.body;
        await carritoDao.createCart(data);
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
        await carritoDao.addProduct(id, productoCarrito)        
    } catch (err) {
        res.status(404).send(err);
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
export const POSTCOMPRA = async (req,res) => {
    try {
        const {id,id_carrito} = req.params;
        const carritoCompra = await carritoDao.getById(id_carrito);
        await compraDao.llenarCompra(id, carritoCompra);
        
        await client.messages.create({
            body:"hola",
            from: "whatsapp:+14155238886",
            to: `whatsapp:+5491160513857`,
            
        })
        res.redirect("/")
    } catch (err) {
        res.status(404).send(err);

    }

}