import {IAdminRepository} from '../../admin/domain/IAdminRepository'
import { Admin } from '../domain/entities/Admin'

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