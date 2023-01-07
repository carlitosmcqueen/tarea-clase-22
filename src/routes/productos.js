import express from "express";
import { Router } from "express";
import connection from "../../mongoConfig.js";
import ContenedorMongo from "../contenedores/contenedorMongo.js";
const DB = new ContenedorMongo(connection,"productos")

const router = Router()
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


router.get("/", async (req, res) => {
    try {
        const data = await DB.getAll()
        console.log("pio")
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const data = await DB.getById(id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});


router.post("/", async (req, res) => {
    try {
        const data = req.body;
        await DB.save(data);
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
        DB.updateById(idInt, prodNuevo);
        res.send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;
        await DB.deleteById(id);
        res.send(`El producto con id ${id} fue eliminado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});

export {router as productosRouter}