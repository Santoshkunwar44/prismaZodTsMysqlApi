import {NextFunction, Request,Response} from "express"
import { prismaClient } from "../index";
import {compareSync, hashSync} from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";



export const login = async(req:Request, res:Response,next:NextFunction) => {


    const {email,password} = req.body;
            const user = await prismaClient.user.findFirst({where:{email}});
            if(!user){
                throw  new  NotFoundException("User not found",ErrorCode.USER_NOT_FOUND)
            }

            if(!compareSync(password,user.password)){
                throw new BadRequest("Incorrect password",ErrorCode.INCORRECT_PASSWORD)
            }

            let token = jwt.sign({
                userId:user.id,
            },JWT_SECRET)
            res.status(200).json({message:{...user,token},success:true})
   
}

export const Register = async(req:Request, res:Response,next:NextFunction) => {
    SignupSchema.parse(req.body)
    const {email,password,name} = req.body;
        const user = await prismaClient.user.findFirst({where:{email}})
        if(user){
          throw new BadRequest("User already exists",ErrorCode.USER_ALEADY_EXIST)
        }
        const newUser = await prismaClient.user.create({data:{
            email,
            name,
            password:hashSync(password,10)
        }})
        res.status(200).json({message:newUser,success:true})
        
   
}

export const Me = async(req:Request, res:Response,next:NextFunction) => {
    res.json({message:req.user,success:true})
        
   
}