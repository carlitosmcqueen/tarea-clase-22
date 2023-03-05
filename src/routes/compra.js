import express from 'express';
import { Router } from 'express';
import * as CompraService from '../service/compra.service.js';

const router = Router()
const app = express()

app.use(express.json())

router.get('/',CompraService.GET)

router.get("/:id",CompraService.GETbyID)
router.get("/misCompras/user",CompraService.GETmisCompras)

router.post("/", CompraService.POSTCOMPRA)


router.delete("/:id",CompraService.DELETECOMPRA)



export { router as compraRouter}



