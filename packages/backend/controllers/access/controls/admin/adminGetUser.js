

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();


const adminGetUser = async (req, res) => {
    console.log("in admin get user");

    try {

        let user = req.user;

        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { userId } = req.params;

        // Find the user by ID
        const foundUser = await UserModel.findOne({ where: { id: userId } });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found", ok: false });
        }
        //  Exclude sensitive information
        const safeUser = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email,
            role: foundUser.role,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
        };
        // Respond with the user information
        return res.status(200).json({ user: safeUser, ok: true });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminGetUser;
