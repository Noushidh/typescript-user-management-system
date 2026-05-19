import { Router } from "express";
import { noCache } from "../../middleware/noCache";
import {adminLoginPageLoad,adminLogin,AdminLogout} from './controller/admin_authentication'
import {adminDashboardPage,blockAndUnblockController} from './controller/admin_dashboard'

const router = Router()

router.get('/login',adminLoginPageLoad.load_login_page)
router.post('/login',adminLogin.loginAdmin)

router.get('/dashboard',noCache,adminDashboardPage.load_login_page)
router.patch('/toggle-user-block/:id',blockAndUnblockController.toggle_block)
router.get('/logout',AdminLogout.logoutAdmin)
export default router