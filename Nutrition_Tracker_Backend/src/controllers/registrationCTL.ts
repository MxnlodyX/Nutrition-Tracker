import { Request, Response } from 'express'
import * as RegistrationService from '../service/registrationService'
import UserInformation from "../model/registrationModel";

export const createNewAccount = async (req:Request,res: Response) =>{
    
    try{
        const user = new UserInformation(req.body);
        const newUser = await RegistrationService.registrationAccount(user);

        if(!newUser) {
            return res.status(400).json({
                message: "Registration Failed"
            })
        }
        delete (newUser as any).password;
        return res.status(201).json({
            message : "User registered successfully",
            user: newUser,
        })
        
    }catch(error: any){
        if(error.status){
            return res.status(error.status).json({message: error.message})
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}