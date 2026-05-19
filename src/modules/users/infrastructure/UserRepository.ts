
import { IUserRepository } from "../domain/IUserRepository";
import { pool } from '../../infrastructure/database/db';

export class UserRepository implements IUserRepository {
    public async create(name: string, email: string, password: string): Promise<void> {
        await pool.query(
            'INSERT INTO users(name,email,password) VALUES($1,$2,$3)',[name,email,password]
        );
    }
    public async findbyEmail(email: string): Promise<any | null> {
        const result = await pool.query(
            'select * from users where email = $1',[email]
        );
        return result.rows[0];
      }    
}