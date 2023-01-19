import express from "express"
import {Router} from "express"
import daos from "../daos/index.js"
import twilio from "twilio"
import * as dotenv from "dotenv"


dotenv.config()


const accountSID = "AC68263a028427d38a73d6e3d832cdc0ae"
const authToken = process.env.TWILIO
const client = twilio(accountSID, authToken)

const {carritoDao,productosDao,compraDao} = await daos

const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/", async (req, res) => {
    try {
        const data = await carritoDao.getAll()
        res.send(data)
    } catch (err) {
        res.status(404).send(err);

    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        let data = await carritoDao.getById(id);
        res.send(data)

    } catch (err) {
        res.status(404).send(err);


    }
});


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await carritoDao.createCart(data);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);


    }
});


router.post("/:id/productos/:id_producto", async (req, res) => {
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
});


router.put("/:id", (req, res) => {
    try {
        const {
            id
        } = req.params;
        const prodNuevo = req.body;
        carritoDao.updateById(id, prodNuevo);
        res.send(`se actualizo el producto`);
    } catch (err) {
        res.status(404).send(err);


    }
})



router.delete("/:id/productos/:id_prod", async (req, res) =>{
    try {
        const { id, id_prod } = req.params;
        const productoCarrito = await productosDao.getById(id_prod)
        await carrito.deleteProdById(id, productoCarrito);
        res.send("Producto Eliminado");
    } catch (err) {
        res.status(404).send(err);


    }
});



router.post("/:id/carrito/:id_carrito", async (req,res) => {
        try {
            const {
                id,
                id_carrito
            } = req.params;
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
    
})



export { router as carritoRouter}