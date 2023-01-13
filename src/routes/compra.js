import express from 'express';
import { Router } from 'express';
import daos from '../daos/index.js';

const {compraDao,carritoDao} = await daos

const router = Router()
const app = express()

app.use(express.json())

router.get('/',async (req,res) => {
    try{
        const data = await compraDao.getAll()
        console.log(data)
        res.send(data);
    }catch(err) {
        res.status(404).send(err)
    }
})
router.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await compraDao.getById(id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
})

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await compraDao.crearCompra(data);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
})

router.post("/:id/carrito/:id_carrito", async (req, res) => {
    try {
        const {
            id,
            id_carrito
        } = req.params;
        const carritoCompra = await carritoDao.getById(id_carrito);
        await compraDao.llenarCompra(id, carritoCompra);
        res.send("se compro");
    } catch (err) {
        res.status(404).send(err);
    }
});

export { router as compraRouter}

