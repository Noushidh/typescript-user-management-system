
import { Request,Response } from "express"

class AdminLoginPageLoadController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
        res.render('admin/presentation/views/admin_login')
    }
}

export const adminLoginPageLoad = new AdminLoginPageLoadController();
