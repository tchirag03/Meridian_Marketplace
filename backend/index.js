import express from "express";
import cors from 'cors'
import { dbConnect } from "./database/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import storeRouter from "./routes/storeRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import productRouter from "./routes/productRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import dotenv from "dotenv";
dotenv.config({ path: './backend/.env' });


const app = express()
app.use(cors())
app.use(express.json())

dbConnect().then(()=>{
    app.listen(3333 ,()=>{
        console.log(" Backend is Started !!")
    })
})

app.use("/auth",authRouter);
app.use("/store",storeRouter);
app.use("/order",orderRouter);
app.use("/products",productRouter);
app.use("/dashboard",dashboardRouter);
