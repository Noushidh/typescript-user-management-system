
import { Router } from 'express'
import * as UserAuthentication from './controller/user_login';

const router = Router();

router.get('/login',UserAuthentication.load_login_page)

export default router;