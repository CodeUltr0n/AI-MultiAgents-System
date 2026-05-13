import express from 'express'
import { getUsers, login, logout, signup, updateUser } from '../inngest/controllers/user'
const router = express.Router();
import {authenticate} from '../inngest/middlewares/auth'

router.post('/update-user',authenticate,updateUser);
router.get('/users',authenticate,getUsers);

router.post("/signup",signup);
router.post("/login",login);
router.post('/logout',logout);



export default router;