import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from '/home/compsciwins/DEV/commerce/backend/config/db.js';
dotenv.config();
const app = express();

app.get("/products", (req, res) => {
    res.send("Server is running!");
});


app.listen(5000,() => {
    connectToDatabase();
    console.log("Server started at https://localhost:5000");
} );

