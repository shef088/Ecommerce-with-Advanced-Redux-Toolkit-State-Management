

import UserModel from "../../../../models/UserModel.js";
import dotenv from "dotenv";


dotenv.config();
 

const adminGetUsers = async (req, res) => {
    console.log("in admin get users");

    try {
        
        let user = req.user;
      

        // Ensure the user making the request is an admin
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Retrieve all users
        const users = await UserModel.findAll(); // Adjust as necessary for your ORM
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
        console.error("Error retrieving users:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default adminGetUsers;
