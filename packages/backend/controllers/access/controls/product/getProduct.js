// controllers/access/controls/product/getProduct.js

import ProductModel from "../../../../models/ProductModel.js";

const getProduct = async (req, res) => {
    try {
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

        return res.status(200).json({
            message: "Product fetched successfully",
            status: 200,
            ok: true,
            product, // Send the product details in the response
        });
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default getProduct;
