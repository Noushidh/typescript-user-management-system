
import { Router } from 'express'
import  {UserLoginPageLoad,UserRegisterPageLoad,userRegister,userLogin,userLogout} from './controller/user_authentication';

const router = Router();

router.get('/register',UserRegisterPageLoad.load_register_page)
router.get('/login',UserLoginPageLoad.load_login_page)
router.post('/register',userRegister.registerUser)
router.post('/login',userLogin.loginUser)
router.get('/home',userLogin.userHome)
router.get('/logout',userLogout.logoutUser)

export default router;