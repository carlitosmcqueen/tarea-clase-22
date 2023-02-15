import express from "express";
import { Router } from "express";
import authMw from "../../middlewares/log.js";

import * as ProductosService from "../service/productos.service.js";


const router = Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/",ProductosService.GET);

router.get("/:id",ProductosService.GETbyID);


router.post("/", ProductosService.POST);

router.put("/:id", ProductosService.PUT);

router.delete("/:id", ProductosService.DELETE)


export {router as productosRouter}