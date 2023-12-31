export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors:any;

    constructor(message:string,errorCode:ErrorCode,statusCode:number,errors:any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }

}

export enum ErrorCode{
    USER_NOT_FOUND = 1001,
    USER_ALEADY_EXIST=1002,
    INCORRECT_PASSWORD=1003,
    UNPROCESSABEL_ENTITY=1004,
    INTERNAL_EXCEPTION= 5000,
    UNAUTHORIZED = 4003,
    PRODUCT_NOT_FOUND=1088,
}