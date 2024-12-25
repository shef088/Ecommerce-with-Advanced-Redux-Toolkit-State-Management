// controllers/access/controls/product/getAllProducts.js

import ProductModel from "../../../../models/ProductModel.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll(); // Fetch all products from the database

        return res.status(200).json({
            message: "Products fetched successfully",
            status: 200,
            ok: true,
            products, // Send the products in the response
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default getAllProducts;
