import { ErrorCode } from "exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorizes";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "secret";
import { prismaClient } from "index";

const AuthMiddleware =async(req:Request,res:Response,next:NextFunction)=>{

    // extract the token form request header 

    const authToken = req.headers['authorization']
    if(!authToken){
        next(new UnauthorizedException("You are not authorized . ",ErrorCode.UNAUTHORIZED))
    }

    // if token is not present, throw an authorization error

    try {
        
        const payload = jwt.verify(authToken,JWT_SECRET) as any;
        const user = await prismaClient.user.findFirst({where:{id:payload?.userId}})
        if(!user){
           next(new UnauthorizedException("You are not authorized . ",ErrorCode.UNAUTHORIZED))
        }
        req.user = user;
        next()
    } catch (error) {
        new UnauthorizedException("You are not authorized . ",ErrorCode.UNAUTHORIZED)
    }    




    //if present  then verify the token and extract the payload


    // get the the user from the payload 

    //to attch the use to the request object 



}


export {AuthMiddleware}