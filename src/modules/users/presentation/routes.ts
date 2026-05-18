
import { Router } from 'express'
import  {UserLoginPageLoad,UserRegisterPageLoad} from './controller/user_authentication';

const router = Router();

router.get('/register',UserRegisterPageLoad.load_register_page)
router.get('/login',UserLoginPageLoad.load_login_page)


export default router;