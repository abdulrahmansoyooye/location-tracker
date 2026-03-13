import mongoose from "mongoose";
export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Databse connected");
    }
    catch (error) {
        console.error("Database connection failed", error);
    }
};
//# sourceMappingURL=database.js.map