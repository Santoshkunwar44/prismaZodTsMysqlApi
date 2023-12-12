import { ErrorCode } from "exceptions/root";
import { UnauthorizedException } from "../exceptions/unauthorizes";
import { NextFunction ,Request,Response} from "express";

const adminMiddleware =(req:Request,res:Response,next:NextFunction)=>{
   const user = req.user;
    if(user.role==="ADMIN"){
        next()
    }else{
        next(new UnauthorizedException("You are not authorized. ",ErrorCode.UNAUTHORIZED))
    }

}
export default adminMiddleware;