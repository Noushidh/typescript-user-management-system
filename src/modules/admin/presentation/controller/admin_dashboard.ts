import { Request,Response } from "express"
import { AdminRepository } from "../../infrastructure/adminRepository";
import {CountUsersUseCase,getAllUserUseCase,toggleUserBlockUsecase} from '../../application/admin-authentication.usecase'


const adminRepository = new AdminRepository();
const countUsersUseCase = new CountUsersUseCase(adminRepository);
const getallUserUseCase = new getAllUserUseCase(adminRepository);
const toggleuserBlockUsecase = new toggleUserBlockUsecase(adminRepository)

class AdminDashboardPageLoadController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
        const totalUsers = await countUsersUseCase.execute();
        const users = await getallUserUseCase.execute();
        res.render('admin/presentation/views/admin_dashboard',{admin:req.session.admin,totalUsers,users})

    }
}

class BlockAndUnblockController {
    public async toggle_block (req:Request,res:Response):Promise<void>{
        try{
        const userId = Number(req.params.id)
        if(!userId){
            res.status(400).json({success:false,message:'Invalid user id'})
            return;
        }
        await toggleuserBlockUsecase.execute(userId);
        res.status(200).json({success:true,message:'successfully updated status'})
        }catch(error:any){
         res.status(400).json({success: false,message:error.message ||'Failed to update user status'});
        }
    }
}

export const adminDashboardPage= new AdminDashboardPageLoadController()
export const blockAndUnblockController =new BlockAndUnblockController();