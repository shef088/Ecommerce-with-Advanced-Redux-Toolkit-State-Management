import OrderModel from "../../../../models/OrderModel.js"; // Import OrderModel
import ProductModel from "../../../../models/ProductModel.js"; // Import ProductModel to fetch product details
import dotenv from "dotenv";


dotenv.config();
 

const checkout = async (req, res) => {
    try {
   
        let user = req.user;
       

        const userId = user.userId ?? null;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized or cookie has expired",
                message: "Cookie is invalid",
                status: 401,
                ok: false,
            });
        }

        const cartItems = req.body; // Expecting an array of CartItem objects

        // Validate cart items
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({
                error: "Invalid cart items",
                message: "Cart items should be a non-empty array.",
                status: 400,
                ok: false,
            });
        }

        // Fetch product details for the latest prices
        const products = await Promise.all(
            cartItems.map(async (item) => {
                const product = await ProductModel.findByPk(item.productId); // Fetch product by ID
                if (!product) {
                    throw new Error(`Product ${item.productId}:${item.name}  not found.`);
                }
                return {
                    productId: product.id,
                    name: product.name,
                    price: product.price, // Latest price from the database
                    order_quantity: item.order_quantity,
                    imageUrl: product.imageUrl,
                };
            })
        );

        // Calculate total amount
        const totalAmount = products.reduce((total, item) => total + item.price * item.order_quantity, 0);

        // Create a new order with structured order items
        const order = await OrderModel.create({
            userId,
            orderItems: products.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                order_quantity: item.order_quantity,
                imageUrl: item.imageUrl,
            })),
            totalAmount,
            status: "completed",
        });

        return res.status(200).json({
            message: "Order created successfully!",
            order,
            ok: true,
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default checkout;
