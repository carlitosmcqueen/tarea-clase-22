import express from 'express';
import { Router } from 'express';
import * as CompraService from '../service/compra.service.js';

const router = Router()
const app = express()

app.use(express.json())

router.get('/',CompraService.GET)

router.get("/:id",CompraService.GETbyID)

router.post("/", CompraService.POSTCOMPRA)

router.post("/:id/carrito/:id_carrito", CompraService.POSTCARRITOinCOMPRA);

export { router as compraRouter}



