import express, { request } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';
import productRoutes from "./routes/product_route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT ||5000 

app.use(express.json()); // For testing purposes, allows us to accept JSON input data from the user

app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    connectToDatabase();
    console.log("Server started at http://localhost:"+PORT);
});
