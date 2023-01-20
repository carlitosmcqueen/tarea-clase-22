import daos from '../daos/index.js';
import { createTransport } from 'nodemailer';

const {compraDao,carritoDao} = await daos

export const GET = async (req,res) => {
    try{
        const data = await compraDao.getAll()
        res.send(data);
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
        res.send(data);
    } catch (err) {
        res.status(404).send(err);

    }
}
export const POSTCOMPRA = async (req, res) => {
    try {
        const data = req.body;
        await compraDao.crearCompra(data);
        res.send(data);
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
        await compraDao.llenarCompra(id, carritoCompra)


        const transporter = createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            auth: {
              user: "virginie.christiansen@ethereal.email",
              pass: "NxBXFkZUZdEta8jezB",
            },

          });
        
          const opts = {
            from: "virginie.christiansen@ethereal.email",
            to: "garth.torp@ethereal.email",
            subject:"Ticket de compra",
            html:`<h1>Hola</h1> <br> <h2>usted a comprado los siguientes porductos ${productosCarrito}</h2>`,
          }
          try {
            return transporter.sendMail(opts);
            
          } catch (e) {
            console.error(e)
          }
        res.redirect("/")
        
    } catch (err) {
        res.status(404).send(err);

    }
}


