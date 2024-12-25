// controllers/access/controls/admin/adminUserSearch.js

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";
import { Op } from "sequelize";

dotenv.config();


const adminUserSearch = async (req, res) => {
    console.log("in admin user search");

    try {
        let user = req.user;

        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { searchTerm } = req.query;
        console.log("search param", searchTerm)

        // Search for users by username or email
        const users = await UserModel.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: `%${searchTerm}%` } },
                    { email: { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });
        // Exclude sensitive information
        const safeUsers = users.map(({ id, username, email, role, createdAt, updatedAt }) => ({
            id,
            username,
            email,
            role,
            createdAt,
            updatedAt,
        }));
        // Respond with the list of users
        return res.status(200).json({ users:safeUsers, ok: true });
    } catch (error) {
        console.error("Error searching users:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminUserSearch;
