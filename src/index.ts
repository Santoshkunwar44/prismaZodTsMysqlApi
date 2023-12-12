import express,{Express} from "express"
import { PORT } from "../src/secret"
import rootRouter from "./routes/index"
import {PrismaClient} from "@prisma/client"
import { errorMiddleware } from "./middlewares/errros"
import { SignupSchema } from "./schema/users"


const app:Express = express()
app.use(express.json())




export const prismaClient = new PrismaClient({
    log: ["query"]
});



app.use("/api",rootRouter)

app.use(errorMiddleware)




app.listen(PORT,()=>console.log("server listening on port " +PORT))

