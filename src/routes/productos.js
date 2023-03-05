import express from "express";
import { Router } from "express";
import authMw from "../middlewares/log.js";
import daos from "../daos/index.js";
const {usuariosDao} = await daos

import * as ProductosService from "../service/productos.service.js";


const router = Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/",ProductosService.GET);

router.get("/:id",ProductosService.GETbyID)


router.get("/categoria/:category",ProductosService.GETbyCategory)

router.post("/", ProductosService.POST);

router.put("/:id", ProductosService.PUT);

router.delete("/:id", ProductosService.DELETE)

router.get("/user/data",async(req, res) => {
    const data = await usuariosDao.IdUser(req.session.user)
    res.send(data.carrito[0]._id)
})


export {router as productosRouter}