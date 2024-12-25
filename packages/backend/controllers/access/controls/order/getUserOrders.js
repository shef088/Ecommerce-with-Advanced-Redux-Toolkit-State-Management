import OrderModel from "../../../../models/OrderModel.js"; // Import OrderModel
import dotenv from "dotenv";


dotenv.config();
 

const getUserOrders = async (req, res) => {
    try {
       
        let user = req.user;
      

        const userId = user.userId ?? null;

       

        // Fetch orders for the user
        const orders = await OrderModel.findAll({
            where: { userId },
        });

        return res.status(200).json({
            orders,
            ok: true,
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default getUserOrders;
