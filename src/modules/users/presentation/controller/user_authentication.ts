

import { promises } from "dns";
import { Request,Response } from "express"

 class UserAuthenticationController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
          res.render('users/presentation/views/user_login');
   }
}

 class UserRegisterController{
      public async load_register_page (req:Request,res:Response):Promise<void>{
            res.render('users/presentation/views/user_register')
      }
}
export const UserLoginPageLoad = new UserAuthenticationController();
export const UserRegisterPageLoad = new UserRegisterController();

