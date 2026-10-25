import mongoose from "mongoose";
import {MONGODB_URL} from "./env.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("MongoDB connected");
    }
    catch (error){
        console.log("MongoDB connection failed");
    }
}