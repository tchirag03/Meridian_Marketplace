import express from "express";
import cors from 'cors'
import { dbConnect } from "./database/dbConnect.js";
import authRouter from "./routes/authRoutes.js";


const app = express()
app.use(cors)
app.use(express.json())

app.listen(3333 ,async()=>{
    await dbConnect();
    console.log(" Backend is Started !!")
})

app.use("/auth",authRouter);