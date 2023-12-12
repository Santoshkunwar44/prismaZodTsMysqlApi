import { InternalException } from "./exceptions/internal-exeception";
import { ErrorCode, HttpException } from "./exceptions/root";
import { NextFunction,Request,Response } from "express";
export const errorHandler= (method:Function)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
           await method(req,res,next)
        } catch (error:any) {
            let exception:HttpException ;
            console.log( error instanceof HttpException)
            if(error instanceof HttpException){
                exception = error;
            }else{
                exception = new InternalException("Something went wrong",error,ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }
}