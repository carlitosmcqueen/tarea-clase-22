import express from "express";
import { Router } from "express";
import daos from "../daos/index.js";
const {productosDao} = await daos()

const router = Router()
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


router.get("/", async (req, res) => {
    try {
        const data = await productosDao.getAll()
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});
router.get("/prueba",(req,res) => {
    res.send("prueba")
})

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.getById(id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await productosDao.save(data);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.put("/:id", (req, res) => {
    try {
        const {id} = req.params;
        const prodNuevo = req.body;
        const idInt = parseInt(id);
        productosDao.updateById(idInt, prodNuevo);
        res.send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await productosDao.deleteById(id);
        res.send(`El producto con id ${id} fue eliminado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});

export {router as productosRouter}