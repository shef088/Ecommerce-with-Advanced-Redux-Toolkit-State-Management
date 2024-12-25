import { Router } from "express";
import checkout from "../controllers/access/controls/order/checkout.js";
import getUserOrders from "../controllers/access/controls/order/getUserOrders.js";
import tokenVerification from "../security/authentication.js";
import authWithUserMiddleware from "../security/authwithUserMiddleware.js";
import cookieAuthMiddleware from "../security/cookieAuthMiddleware.js";

const checkoutRoutes = Router();

// Checkout route
checkoutRoutes.post("/checkout", 
    // tokenVerification,
     // cookieAuthMiddleware,
    authWithUserMiddleware,
    checkout);
// Route to get user orders
checkoutRoutes.get("/orders",
    //  tokenVerification, 
    //   cookieAuthMiddleware,
     authWithUserMiddleware,
     getUserOrders);

export default checkoutRoutes;
