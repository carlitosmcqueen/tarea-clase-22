import express from "express";
import { Router } from "express";

import * as MensajesService from "../service/mensaje.service.js";


const router = Router()
const app = express()
app.use(express.json())



router.get("/", MensajesService.GetMessage)
router.get("/mail", MensajesService.GetMessageUser)

export {router as mensajesRouter}