
import { Request,Response } from "express"
import {LoginAdminUseCase} from '../../application/admin-authentication.usecase'
import { AdminRepository } from "../../infrastructure/adminRepository";

const adminRepository = new AdminRepository();
const loginAdminUseCase = new LoginAdminUseCase(adminRepository)

class AdminLoginPageLoadController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
        res.render('admin/presentation/views/admin_login')
    }
}

class AdminLoginAuthenticationControllder {
    constructor(private loginAdminUseCase:LoginAdminUseCase){}
    public loginAdmin = async(req:Request,res:Response):Promise<void>=>{
      try{
        const{email,password} = req.body;
        console.log(req.body);
        const admin =  await this.loginAdminUseCase.check(email,password)
              req.session.admin = {
              id: admin.id,
              name: admin.name,
              email: admin.email,
      };
      res.status(200).json({success:true,message:'Login successfully',redirect:'/admin/dashboard'})
      }catch(error:any){
         res.status(400).json({success: false,message:error.message || 'Invalid email or password',});
      }
    }
}

export const adminLoginPageLoad = new AdminLoginPageLoadController();
export const adminLogin = new AdminLoginAuthenticationControllder(loginAdminUseCase);
