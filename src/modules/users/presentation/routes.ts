
import { Router } from 'express'
import { noCache } from '../../middleware/noCache';
import  {UserLoginPageLoad,UserRegisterPageLoad,userRegister,userLogin,userLogout} from './controller/user_authentication';

const router = Router();

router.get('/register',noCache,UserRegisterPageLoad.load_register_page)
router.get('/login',noCache,UserLoginPageLoad.load_login_page)
router.post('/register',userRegister.registerUser)
router.post('/login',userLogin.loginUser)
router.get('/home',noCache,userLogin.userHome)
router.get('/logout',userLogout.logoutUser)

export default router;