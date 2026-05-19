
import { Request,Response } from "express"
import {LoginAdminUseCase} from '../../application/admin-authentication.usecase'
import { AdminRepository } from "../../infrastructure/adminRepository";

const adminRepository = new AdminRepository();
const loginAdminUseCase = new LoginAdminUseCase(adminRepository)

class AdminLoginPageLoadController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
        if(req.session.admin){
            res.redirect('/admin/dashboard')
            return;
        }
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

class AdminLogoutController {
    public logoutAdmin = async(req:Request,res:Response):Promise<void>=>{
        req.session.destroy((error)=>{
            if(error){
                res.status(500).json({success: false,message: 'Logout failed'});
                return;
            }
            res.clearCookie('connect.sid')
            res.redirect('/admin/login')
        })
    }
}

export const adminLoginPageLoad = new AdminLoginPageLoadController();
export const adminLogin = new AdminLoginAuthenticationControllder(loginAdminUseCase);
export const AdminLogout = new AdminLogoutController();