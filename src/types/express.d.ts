import { User } from "@prisma/client";
import express from "express"


declare module 'express'{
     interface Request{
        user:User
    }
}