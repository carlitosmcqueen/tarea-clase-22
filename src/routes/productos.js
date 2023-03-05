import express from "express";
import { Router } from "express";
import {authMw,isAdmin} from "../middlewares/middleware.js";

import * as ProductosService from "../service/productos.service.js";


const router = Router()
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



router.get("/",authMw,ProductosService.GET);

router.get("/:id",authMw,ProductosService.GETbyID)


router.get("/categoria/:category",authMw,ProductosService.GETbyCategory)

//metodos manuales
router.post("/",isAdmin,ProductosService.POST);

router.put("/:id",isAdmin ,ProductosService.PUT);

router.delete("/:id",isAdmin,ProductosService.DELETE)



export {router as productosRouter}