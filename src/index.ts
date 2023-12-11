import express,{Express} from "express"
import { PORT } from "../src/secret"
import rootRouter from "./routes/index"
import {PrismaClient} from "@prisma/client"

const app:Express = express()
app.use(express.json())




export const prismaClient = new PrismaClient({
    log: ["query"]
})

app.use("/api",rootRouter)


app.listen(PORT,()=>console.log("server listening on port " +PORT))

