import { Router } from "express";
import {adminLoginPageLoad,adminLogin} from './controller/admin_authentication'

const router = Router()

router.get('/login',adminLoginPageLoad.load_login_page)
router.post('/login',adminLogin.loginAdmin)

export default router