// controllers/access/controls/product/deleteProduct.js

import ProductModel from "../../../../models/ProductModel.js";
import dotenv from "dotenv";


dotenv.config();
 

const deleteProduct = async (req, res) => {
    console.log("in delete product");

    try {
         
        let user = req.user;
        

        const authorId = user.userId ?? null;

        if (!authorId) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "User ID is invalid",
                status: 401,
                ok: false,
            });
        }

        const { productId } = req.params;

        // Find the product by ID
        const product = await ProductModel.findOne({ where: { id: productId } });

        if (!product) {
            return res.status(404).json({
                error: "Not Found",
                message: "Product not found",
                status: 404,
                ok: false,
            });
        }

        // Check if the logged-in user is the seller of the product
        if (product.sellerId !== authorId) {
            return res.status(403).json({
                error: "Forbidden",
                message: "You are not allowed to delete this product",
                status: 403,
                ok: false,
            });
        }

        // Delete the product
        await ProductModel.destroy({ where: { id: productId } });

        return res.status(200).json({
            message: "Successfully deleted the product!",
            status: 200,
            ok: true,
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default deleteProduct;
