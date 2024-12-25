import ProductModel from "../../../../models/ProductModel.js";
import dotenv from "dotenv";
import multer from 'multer';
import fs from 'fs';
import path from 'path';

dotenv.config();


// Create Multer upload instance for image updates
const upload = multer({ dest: 'uploads/' });

const updateProduct = async (req, res) => {
    console.log("in update product");

    try {
        let user = req.user;
        
        const authorId = user.userId ?? null;

        if (!authorId) {
            return res.status(401).json({
                error: "Unauthorized or cookie has expired",
                message: "Cookie is invalid",
                status: 401,
                ok: false,
            });
        }
        console.log("req::", req)
        const { productId } = req.params; // Get productId from the request parameters
        const { name, price, quantity, description } = req.body;
        console.log(productId, name, price, quantity, description)
        // Find the product to update
        const product = await ProductModel.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({
                message: "Product not found.",
                ok: false,
            });
        }
  // Check if the logged-in user is the seller of the product
  if (product.sellerId !== authorId) {
    return res.status(403).json({
        error: "Forbidden",
        message: "You are not allowed to update this product",
        status: 403,
        ok: false,
    });
}
        // Check for image update
        const imageUrl = req.file ? req.file.filename : null;
        if (imageUrl) {
          

            // Optionally delete the old image file if necessary
            const oldImagePath = path.join('uploads', product.imageUrl);
            fs.unlink(oldImagePath, (err) => {
                if (err) console.error("Failed to delete old image:", err);
            });
        }

        // Update the product details
        await ProductModel.update(
            {
                name,
                price,
                quantity,
                description,
                imageUrl : imageUrl ? imageUrl  : product.imageUrl // Updated image URL
            },
            {
                where: { id: productId }
            }
        );

        return res.status(200).json({
            message: "Product updated successfully!",
            ok: true,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default updateProduct;
