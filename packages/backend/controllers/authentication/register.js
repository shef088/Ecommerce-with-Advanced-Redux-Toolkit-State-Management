// controllers/authentication/register.js

import UserModel from "../../models/UserModel.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        // Only admin can assign roles
        if (role && req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can assign roles." });
        }

        // Validate input
        if (!username || !password || !email) {
            return res.status(400).json({ message: "Invalid Request" });
        }

        // Check if user already exists
        const user = await UserModel.findOne({ where: { username } });
        if (user) {
            return res.status(400).json({ message: "User already exists", ok: false });
        }
        const emailExists = await UserModel.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "Email already taken", ok: false });
        }
 console.log("info::",  username,email,password)
        // Password Hashing
        const salt = await bcrypt.genSalt(10);
		console.log("salt::", salt)
        const hashedPassword = await bcrypt.hash(password, salt);
		console.log("hashedPassword::", hashedPassword)
        // Create new user with role
        await UserModel.create({
            username,
            email,
            password: hashedPassword,
			salt: salt,
            role: role || "shopper", // Default to shopper if no role is provided
        });

        return res.status(200).json({ message: "User Created", ok: true });
    } catch (error) {
        console.log("err1:::",error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default register;
