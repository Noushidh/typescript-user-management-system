
import { Admin } from './entities/Admin';
import { User } from '../../users/domain/entities/User';

export interface IAdminRepository {
  findByEmail(email: string): Promise<Admin | null>;
  countUser():Promise<number>;
  getallusers():Promise<User[]>;
  toggleUserBlock(userId:number):Promise<void>;
}