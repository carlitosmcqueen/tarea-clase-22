import express from "express"
import {Router} from "express"
import daos from "../daos/index.js"

const {carritoDao,productosDao} = await daos

const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/", async (req, res) => {
    try {
        const data = await carritoDao.getAll()
        
        res.render("main",{layout:"carrito",data:data});
        
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        let data = await carritoDao.getById(id);
        const ojo = data.productos
        console.log(ojo)
        res.render("main",{layout:"carrito",data:data,ojo:ojo});

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
        res.status(404).send(err.msg);
    }
})



router.delete("/:id/productos/:id_prod", async (req, res) =>{
    try {
        const { id, id_prod } = req.params;
        const productoCarrito = await productosDao.getById(id_prod)
        await carrito.deleteProdById(id, productoCarrito);
        res.send("Producto Eliminado");
    } catch (e) {
        res.send({ error: true });
    }
});



export { router as carritoRouter}