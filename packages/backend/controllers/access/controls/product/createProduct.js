import ProductModel from "../../../../models/ProductModel.js";
import dotenv from "dotenv";

import multer from 'multer';
import fs from 'fs';

dotenv.config();
 

// Create Multer upload instance
const upload = multer({ dest: 'uploads/' });

const createProduct = async (req, res) => {
    console.log("in create product");

    try {
    
        let user = req.user;
        

        const authorUserName = user.username ?? null;
        const authorId = user.userId ?? null;

        if (!authorUserName || !authorId) {
            return res.status(401).json({
                error: "Unauthorized or cookie has expired",
                message: "Cookie is invalid",
                status: 401,
                ok: false,
            });
        }

        const { name, price, quantity, description } = req.body;

        // Get the image from the request (Multer will handle the upload)
        const imageUrl = req.file ? req.file.filename : null;

        // Ensure the image file was uploaded
        if (!imageUrl) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Image is required",
                status: 400,
                ok: false,
            });
        }

        // Create the product with the sellerId
        const newProduct = await ProductModel.create({
            name,
            price,
            quantity,
            description,
            imageUrl, // Store image filename
            sellerId: authorId, // Assigning the sellerId from the logged-in user
        });

        return res.status(200).json({
            message: "Successfully created new product!",
            status: 200,
            ok: true,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default createProduct;
