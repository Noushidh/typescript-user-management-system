import { IAdminRepository } from "../domain/IAdminRepository";
import { pool } from "../../infrastructure/database/db";
import { Admin } from "../domain/entities/Admin";
import { User } from "../../users/domain/entities/User";

export class AdminRepository implements IAdminRepository {
  public async findByEmail(email: string): Promise<Admin | null> {
    const result = await pool.query(
      'SELECT * FROM admin WHERE email = $1',[email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Admin;
  }

  public async countUser(): Promise<number> {
    const result = await pool.query('SELECT COUNT(*) FROM users');

    return Number(result.rows[0].count);
  }

  public async getallusers(): Promise<User[]> {
      const result = await pool.query('SELECT * FROM users ORDER BY id DESC'
    )
     return result.rows as User[];
  }

  public async toggleUserBlock(userId: number): Promise<void> {
      await pool.query(
        `UPDATE users
        SET is_blocked = NOT is_blocked
        WHERE id = $1 `,[userId]
      );
  }
}
