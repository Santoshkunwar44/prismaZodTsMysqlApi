import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index";
import { NotFoundException } from "exceptions/not-found";
import { ErrorCode } from "exceptions/root";


export const createProduct=async(req:Request,res:Response,next:NextFunction)=>{

    const product =   await prismaClient.product.create({data:{
        ...req.body,
        tags: req.body.tags.join(","),
    }})
    res.status(200).json({message:product,success:true})



    
}

export const getProducts = async(req:Request,res:Response,next:NextFunction)=>{
    const productCount = await prismaClient.product.count()
    const products = await prismaClient.product.findMany({
        skip: +req.query.skip ||0 ,
        take: +req.query.take || 5 ,
    })
    res.status(200).json({message:{productCount,products},success:true})
}

export const getProducsById =async(req:Request,res:Response,next:NextFunction)=>{
    try {
        
        const product = await prismaClient.product.findUnique({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({message:product,success:true})
    } catch (error) {
        throw new NotFoundException("Product not found",ErrorCode.PRODUCT_NOT_FOUND)
    }
}
export const deleteProducsById =async(req:Request,res:Response,next:NextFunction)=>{
        
        const product = await prismaClient.product.delete({
            where:{
                id:+req.params.id
            }
        })
        res.status(200).json({message:product,success:true})
   
}
export const updateProduct =async(req:Request,res:Response,next:NextFunction)=>{
        
        if(req.body.tags){
            req.body.tags = req.body.tags.join(",");
        }

        const product = await prismaClient.product.update({
            where:{
                id:+req.params.id
            },
            data:req.body
        })
        res.status(200).json({message:product,success:true})
   
}