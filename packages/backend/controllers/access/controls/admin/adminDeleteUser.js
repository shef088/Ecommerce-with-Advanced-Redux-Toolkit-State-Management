// controllers/access/controls/admin/adminDeleteUser.js

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";


dotenv.config();
 

const adminDeleteUser = async (req, res) => {
    console.log("in admin delete user");

    try {
        
        let adminUser = req.user;
        

        // Ensure the user has an admin role
        if (adminUser.role !== "admin") {
            return res.status(403).json({
                error: "Forbidden",
                message: "Only admins can delete users",
                status: 403,
                ok: false,
            });
        }

        const { userId } = req.params;

        // Find and delete the user
        const user = await UserModel.findOne({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({
                error: "Not Found",
                message: "User not found",
                status: 404,
                ok: false,
            });
        }

        await UserModel.destroy({ where: { id: userId } });

        return res.status(200).json({
            message: "Successfully deleted the user!",
            status: 200,
            ok: true,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(503).json({
            error: "Internal server error",
            message: error.message,
            status: 503,
            ok: false,
        });
    }
};

export default adminDeleteUser;
