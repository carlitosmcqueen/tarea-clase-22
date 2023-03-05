import express from 'express';
import { Router } from 'express';
import * as CompraService from '../service/compra.service.js';
import {authMw,isAdmin} from "../middlewares/middleware.js";

const router = Router()
const app = express()

app.use(express.json())

router.get('/',authMw,CompraService.GET)

router.get("/:id",authMw,CompraService.GETbyID)

router.get("/misCompras/user",authMw,CompraService.GETmisCompras)

//metodos manuales
router.post("/",authMw, CompraService.POSTCOMPRA)

router.delete("/:id",isAdmin,CompraService.DELETECOMPRA)



export { router as compraRouter}



