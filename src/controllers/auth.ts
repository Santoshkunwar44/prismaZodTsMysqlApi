import {Request,Response} from "express"
import { prismaClient } from "../index";
import {compareSync, hashSync} from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";



export const login = async(req:Request, res:Response) => {

    const {email,password} = req.body;
    try {
            const user = await prismaClient.user.findFirst({where:{email}});
            if(!user){
                throw Error("User doesnot exist");
            }

            if(!compareSync(password,user.password)){
                throw Error("Invalid credentials");
            }

            let token = jwt.sign({
                userId:user.id,
            },JWT_SECRET)
            res.status(200).json({message:{...user,token},success:true})
    } catch (error) {
        res.status(500).json({message:error.message,success:false})  
    }

}

export const Register = async(req:Request, res:Response) => {

    const {email,password,name} = req.body;

    try {
        const user = await prismaClient.user.findFirst({where:{email}})
        if(user){
            throw Error("This email is already registered")
        }
        const newUser = await prismaClient.user.create({data:{
            email,
            name,
            password:hashSync(password,10)
        }})

        res.status(200).json({message:newUser,success:true})
        
    } catch (error) {
        res.status(500).json({message:error.message,success:false})
    }

}