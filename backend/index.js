import express from "express";
import cors from 'cors'
import { dbConnect } from "./database/dbConnect.js";
import authRouter from "./routes/authRoutes.js";
import storeRouter from "./routes/storeRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import productRouter from "./routes/productRoutes.js";



const app = express()
app.use(cors)
app.use(express.json())

app.listen(3333 ,async()=>{
    await dbConnect();
    console.log(" Backend is Started !!")
})

app.use("/auth",authRouter);
app.use("/store",storeRouter);
app.use("/order",orderRouter);
app.use("/products",productRouter);
