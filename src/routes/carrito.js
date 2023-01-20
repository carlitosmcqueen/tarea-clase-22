import express from "express"
import {Router} from "express"

import * as CarritoService from "../service/carrito.service.js"

const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get("/", CarritoService.GET);

router.get("/:id", CarritoService.GETbyID);


router.post("/",CarritoService.POSTCART);


router.post("/:id/productos/:id_producto", CarritoService.POSTPRODUCT);


router.put("/:id",CarritoService.PUTCART)


router.delete("/:id/productos/:id_prod", CarritoService.DELETEPRODUCT);



router.post("/:id/carrito/:id_carrito", CarritoService.POSTCOMPRA)


export { router as carritoRouter}