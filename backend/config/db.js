import mongoose from'mongoose';

export const connectToDatabase = async () => {
try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);// Exit process with failure means 1 
    }};