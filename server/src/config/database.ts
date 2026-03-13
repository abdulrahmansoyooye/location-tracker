import mongoose from "mongoose"

export const connectDatabase = async () => { 
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("MONGO_URI environment variable is not defined");
            process.exit(1);
        }
        await mongoose.connect(uri)
        console.log("Database connected")
    } catch (error) {
        console.error("Database connection failed", error)
        process.exit(1)
    }
 }