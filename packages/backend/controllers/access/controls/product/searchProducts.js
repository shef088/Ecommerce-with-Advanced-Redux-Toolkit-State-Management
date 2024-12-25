// controllers/access/controls/product/searchProducts.js

import ProductModel from "../../../../models/ProductModel.js";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();
 

const searchProducts = async (req, res) => {
    console.log("in product search");

    try {
        const { searchTerm } = req.query;
        console.log("req.query",req.query )
      

        // Search for products by name or description
        const products = await ProductModel.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${searchTerm}%` } },
                    { description: { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });

        // Respond with the list of products
        return res.status(200).json({ products, ok: true });
    } catch (error) {
        console.error("Error searching products:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default searchProducts;
