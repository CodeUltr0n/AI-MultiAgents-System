import express from 'express'
import {authenticate} from '../middlewares/auth.js'
import { createToken, getToken, getTokens } from '../controllers/token.js'


const router = express.Router()

router.get("/",authenticate,getTokens)
router.get("/:id",authenticate,getToken)
router.post("/",authenticate,createToken)


export default router;
