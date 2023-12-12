import {NextFunction, Request,Response} from "express"
import { prismaClient } from "../index";
import {compareSync, hashSync} from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../secret";
import { BadRequest } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { SignupSchema } from "../schema/users";
import { UnproccessableEntity } from "../exceptions/validation";



export const login = async(req:Request, res:Response,next:NextFunction) => {

    try {

    const {email,password} = req.body;
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
    } catch (error:any) {
            next(new UnproccessableEntity(error?.issues,"Unproccessable Entity",ErrorCode.UNPROCESSABEL_ENTITY))
    }

}

export const Register = async(req:Request, res:Response,next:NextFunction) => {
    try {
    SignupSchema.parse(req.body)
    const {email,password,name} = req.body;

        const user = await prismaClient.user.findFirst({where:{email}})
        if(user){
           next(new BadRequest("User already exists",ErrorCode.USER_ALEADY_EXIST));
        }
        const newUser = await prismaClient.user.create({data:{
            email,
            name,
            password:hashSync(password,10)
        }})

        res.status(200).json({message:newUser,success:true})
        
    } catch (error) {
         next(new UnproccessableEntity(error?.issues,"Unproccessable Entity",ErrorCode.UNPROCESSABEL_ENTITY))
    }

}