// security/adminCheck.js

const cookieAuthMiddleware = (req, res, next) => {
    const token = req.signedCookies["advanced-state-management-user"];
    if (!token) {
        return res.status(403).json({
            error: "Unauthorized",
            message: "No token provided",
            status: 403,
            ok: false,
        });
    }

    const user = jwt.verify(token, process.env.TOKEN);
    
   

    req.user = user; // Set the user in req for later use in controllers
    next();
};

export default cookieAuthMiddleware;
