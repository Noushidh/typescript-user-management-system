

import { Request,Response } from "express"

const load_login_page = async (req:Request,res:Response):Promise<void>=>{
      res.render('users/views/user_login');
}

export {load_login_page}