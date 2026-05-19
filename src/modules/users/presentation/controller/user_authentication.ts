

import { Request,Response } from "express"
import {RegisterUserUseCase,CheckCredentialsUseCase} from '../../application/use-cases/user-authentication.usecase'
import {UserRepository} from '../../infrastructure/UserRepository';

const userRepository = new UserRepository();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const checkCredentialsUseCase =new CheckCredentialsUseCase(userRepository);

 class UserLoginController {
    public async load_login_page (req:Request,res:Response):Promise<void>{
          if(req.session.user){
            res.redirect('/home')
            return;
          }
          res.render('users/presentation/views/user_login');
   }
}

 class UserRegisterController{
      public async load_register_page (req:Request,res:Response):Promise<void>{
            if(req.session.user){
              res.redirect('/home')
              return;
            }
          res.render('users/presentation/views/user_register')
      }
}

class UserRegistrationController{
  constructor(private RegisterUserUseCase:RegisterUserUseCase){} 
  public  registerUser =async(req:Request,res:Response):Promise<void>=>{
      try{
      const {name,email,password}=req.body;
      console.log(req.body)
        await this.RegisterUserUseCase.execute(name,email,password);
        res.status(201).json({success:true,message:'User created successfully'});
      }catch(error:any){
      res.status(400).json({success:false,message:error instanceof Error ? error.message: 'Something went wrong'})
      }
  }
}

class userLoginCheckController {
    constructor(private checkCredentials : CheckCredentialsUseCase){};
    public loginUser = async(req:Request,res:Response):Promise<void>=>{
      try{
       const {email,password} = req.body;
       console.log(req.body)
        const user = await this.checkCredentials.check(email,password)
        req.session.user = {
          id:user.id,
          name:user.name,
          email:user.email,
        }
         res.status(200).json({success:true,message:'Login successful'})
      }catch(error:any){
        res.status(400).json({success:false,message:error.message||'invalid email or password'})
      }
    }

  public userHome = async(req:Request,res:Response):Promise<void>=>{
  if(!req.session.user){
    res.redirect('/login');
    return;
  }
  const user = await userRepository.findbyEmail(req.session.user.email)
  if(user.is_blocked){
    req.session.destroy(()=>{});
    res.redirect('/login')
    return;
  }
  res.setHeader('Cache-Control','no-store, no-cache, must-revalidate, private');
  res.render('users/presentation/views/user_home',{user:req.session.user})
}

}

class UserLogoutController {
  public logoutUser = async (req: Request,res: Response): Promise<void> => {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({success: false,message: 'Logout failed'});
        return;
      }
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  };
}


export const UserLoginPageLoad = new UserLoginController();
export const UserRegisterPageLoad = new UserRegisterController();
export const userRegister = new UserRegistrationController(registerUserUseCase);
export const userLogin = new userLoginCheckController(checkCredentialsUseCase);
export const userLogout = new UserLogoutController();