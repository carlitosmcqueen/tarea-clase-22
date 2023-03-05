import express from "express"
import {Router} from "express"
import {authMw,isAdmin} from "../middlewares/middleware.js";

import * as CarritoService from "../service/carrito.service.js"

const router = Router()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//obtener carrito
router.get("/", authMw,CarritoService.GET);
router.get("/:id", authMw,CarritoService.GETbyID);

//manejo del usuario de los productos
router.post("/producto/:id_producto",authMw ,CarritoService.POSTPRODUCTACTIVE)

router.delete("/producto/:id_producto",authMw, CarritoService.DELETEPRODUCTACTIVE)

//metodos manuales 
router.post("/",authMw,isAdmin,CarritoService.POSTCART);
router.post("/:id/productos/:id_producto", isAdmin,CarritoService.POSTPRODUCT);
router.put("/:id",isAdmin,CarritoService.PUTCART)
router.delete("/:id/productos/:id_prod",isAdmin, CarritoService.DELETEPRODUCT);



export { router as carritoRouter}