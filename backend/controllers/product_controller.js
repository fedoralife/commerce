import mongoose from "mongoose";
import Product from "../../models/product.js";

export const getProducts = 
async (req,res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            sucess : true , data : products
        })
    } catch (error) {
        console.log("Error When fetching products", error.message)
       res.status(500).json({
        success : false , message : "Server error"
       }) 
    }
}

export const createProduct = async (req, res) => {
    const product = req.body; // User data insertion

    // Correct the typo: "catergory" -> "category"
    if (!product.name || !product.price || !product.category || !product.description || !product.quantity || !product.image) {
        return res.status(400).json({
            success: false, message: "Please provide all the necessary fields"
        });
    }

    const newProduct = new Product({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        quantity: product.quantity,
        image: product.image
    });

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating a product", error.message);
        res.status(500).json({
            success: false, message: "Server error"
        });
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
                res.status(200).json({
            success: true, message: "Product deleted successfully"
        })
    } catch (error) {
        
        console.log("Error When deleting products", error.message)
                res.status(404).json({
            success: false, message: "Product not found"
    });
}
}

export const updateProduct =  async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Id input"
        });
    }

    try {
        // Update the product
        const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // If no product was found with that id
        if (!updateProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: updateProduct
        });
    } catch (error) {
        // Log the error for debugging purposes
        console.error(error);
        
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
}