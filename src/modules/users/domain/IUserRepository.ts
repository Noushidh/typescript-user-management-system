
import {User} from '../domain/entities/User'

export interface IUserRepository {
    create(
        name:string,
        email:string,
        password:string
    ):Promise<void>;
    findbyEmail(email:string):Promise<User|null>;
}