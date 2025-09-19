import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

export const dbConnect = async () => {
  try {
    await mongoose.connect(await process.env.MONGO_URI).then(() => {
    console.log(" Successfully Connected to DB");
  });
  } catch (error) {
    console.log(error)
  }
};