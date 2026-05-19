import { Router } from "express";
import {adminLoginPageLoad} from './controller/admin_authentication'

const router = Router()

router.get('/login',adminLoginPageLoad.load_login_page)

export default router