import { HttpException } from "./root"

export class UnproccessableEntity  extends HttpException{

    constructor(error:any,message:string,errorCode:number){
        super(message,errorCode,422,error);
    }
}