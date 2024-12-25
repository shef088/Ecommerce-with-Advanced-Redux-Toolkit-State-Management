import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const config = process.env;

const jwt = jsonwebtoken;

const authWithUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Token not provided.");
        return res.status(403).send({
            ok: false,
            message: "Token is not provided",
            status: 403,
        });
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header

    try {
        // Verify and decode the token
        const user = jwt.verify(token, config.TOKEN);
        
        // Attach user data to req for later use in controllers
        req.user = user;
    } catch (err) {
        console.error("Failed to authenticate token:", err);
        return res.status(401).send({
            ok: false,
            message: "Failed to authenticate token.",
            status: 401,
        });
    }

    next();
};

export default authWithUserMiddleware;
