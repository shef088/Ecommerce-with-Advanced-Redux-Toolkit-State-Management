// controllers/access/controls/user/adminUpdateUser.js

import UserModel from "../../../../models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
 
const adminUpdateUser = async (req, res) => {
    console.log("in admin update user");

    try {
        // Check if the token exists in signed cookies
      
        let user = req.user;
       
        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { userId } = req.params; // Get the user ID from the request parameters
        const { username, password, email, role } = req.body;

        // Validate input
        if (!userId || (!username && !password && !email && !role)) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Check if user exists
        const existingUser = await UserModel.findOne({ where: { id: userId } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found", ok: false });
        }

        // Update fields if provided
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (role) updatedFields.role = role;

        // Hash new password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
            updatedFields.salt = salt; // Store the new salt
        }

        // Update user
        await UserModel.update(updatedFields, { where: { id: userId } });

        return res.status(200).json({ message: "User updated successfully", ok: true });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminUpdateUser;
