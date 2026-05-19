import { Router } from "express";
import {adminLoginPageLoad,adminLogin} from './controller/admin_authentication'
import {adminDashboardPage,blockAndUnblockController} from './controller/admin_dashboard'
const router = Router()

router.get('/login',adminLoginPageLoad.load_login_page)
router.post('/login',adminLogin.loginAdmin)

router.get('/dashboard',adminDashboardPage.load_login_page)
router.patch('/toggle-user-block/:id',blockAndUnblockController.toggle_block)
export default router