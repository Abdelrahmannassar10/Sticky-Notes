import mongoose from "mongoose";
export const connectDB = async () => {
    mongoose.connect("mongodb://localhost:27017/sticky_notes")
    .then(() => {
        console.log("MongoDB connection established");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
}