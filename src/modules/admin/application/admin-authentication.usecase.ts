import {IAdminRepository} from '../../admin/domain/IAdminRepository'
import { Admin } from '../domain/entities/Admin'
import { User } from '../../users/domain/entities/User';

export class LoginAdminUseCase {
  constructor(private adminRepository: IAdminRepository) {}

  public async check(
    email: string,
    password: string
  ): Promise<Admin> {
    if (!email || !password) {
      throw new Error(
        'Email and password are required'
      );
    }

    const existingAdmin =await this.adminRepository.findByEmail(email);

    if (!existingAdmin) {
      throw new Error('Invalid email or password');
    }

    if (existingAdmin.password !== password) {
      throw new Error('Invalid email or password');
    }

    return existingAdmin;
  }
}

export class CountUsersUseCase {
  constructor(private adminRepository:IAdminRepository){}
  public async execute():Promise<number>{
    return await this.adminRepository.countUser();
  }
}
export class getAllUserUseCase{
    constructor(private adminRepository:IAdminRepository){}
    public async execute():Promise<User[]>{
        return await this.adminRepository.getallusers();
    }
}
export class toggleUserBlockUsecase{
     constructor(private adminRepository:IAdminRepository){}
     public async execute(userId:number):Promise<void>{
        if(!userId){
           throw new Error('Invalid user id');
        }
        await this.adminRepository.toggleUserBlock(userId);
     }
  }    