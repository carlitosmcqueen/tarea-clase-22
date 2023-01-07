import express from 'express'
import { Router } from 'express'


const router = Router()
const app = express()
app.use(express.json())




export {router as usuariosRouter}