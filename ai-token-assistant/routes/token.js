import express from 'express'
import {authenticate} from '../inngest/middlewares/auth'
import { getUsers, login, logout, signup, updateUser } from '../inngest/controllers/user'
import { createToken, getToken, getTokens } from '../controllers/token'


const router = express.Router()

router.get("/",authenticate,getTokens)
router.get("/:id",authenticate,getToken)
router.post("/",authenticate,createToken)


export default router;