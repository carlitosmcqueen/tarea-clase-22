import express from "express";
import { Router } from "express";
import * as MensajesService from "../service/mensaje.service.js";

import {authMw} from "../middlewares/middleware.js";


const router = Router()
const app = express()
app.use(express.json())


router.get("/",authMw, MensajesService.GetMessage)
router.get("/mail",authMw, MensajesService.GetMessageUser)

export {router as mensajesRouter}