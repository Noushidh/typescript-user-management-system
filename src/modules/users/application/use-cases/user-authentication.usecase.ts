import bcrypt from 'bcrypt';
import {IUserRepository} from '../../domain/IUserRepository'
import { User } from '../../domain/entities/User';

 export class RegisterUserUseCase {
    constructor(private userRepository:IUserRepository){}
    public async execute(
        name:string,
        email:string,
        password:string
    ):Promise<void>{
       if(!name || !email || !password){
        throw new Error('All fields are required')
       }
       const existingUser = await this.userRepository.findbyEmail(email);
       if(existingUser){
        throw new Error('Email already exists')
       }
       const hashedPassword = await bcrypt.hash(password,10)
       await this.userRepository.create(name,email,hashedPassword)
    }
}

export class CheckCredentialsUseCase {
    constructor(private userRepository:IUserRepository){}
    public async check(
        email:string,
        password:string
    ):Promise<User>{
     if (!email || !password) {
      throw new Error('Email and password are required');
      }
        const existingUser = await this.userRepository.findbyEmail(email)
        if(!existingUser){
           throw new Error('Invalid email or password');
        }
        const ispasswordValid = await bcrypt.compare(password,existingUser.password)
        if(!ispasswordValid){
            throw new Error('Invalid email or password')
        }
        return existingUser
    }
}
