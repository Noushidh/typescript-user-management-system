import { IAdminRepository } from "../domain/IAdminRepository";
import { pool } from "../../infrastructure/database/db";
import { Admin } from "../domain/entities/Admin";

export class AdminRepository implements IAdminRepository {
  public async findByEmail(email: string): Promise<Admin | null> {
     const result = await pool.query(
        'select * from admin where email = $1',[email]
     );
     return result.rows[0]
  }
}