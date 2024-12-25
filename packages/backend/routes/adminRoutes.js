import { Router } from "express";
import adminCreateUser from "../controllers/access/controls/admin/adminCreateUser.js";
import adminDeleteUser from "../controllers/access/controls/admin/adminDeleteUser.js";
import adminGetUser from "../controllers/access/controls/admin/adminGetUser.js";
import adminGetUsers from "../controllers/access/controls/admin/adminGetUsers.js";
import adminUpdateUser from "../controllers/access/controls/admin/adminUpdateUser.js";

import tokenVerification from "../security/authentication.js";
import authWithUserMiddleware from "../security/authwithUserMiddleware.js";
import cookieAuthMiddleware from "../security/cookieAuthMiddleware.js";
import adminUserSearch from "../controllers/access/controls/admin/adminUserSearch.js";

const adminRoutes = Router({ mergeParams: true });

// Admin routes
adminRoutes.post("/admin/user/create", 
    // tokenVerification,
    // cookieAuthMiddleware,
    authWithUserMiddleware,
     adminCreateUser);
adminRoutes.delete("/admin/user/delete/:userId", 
    // tokenVerification, 
     // cookieAuthMiddleware,
    authWithUserMiddleware,
    adminDeleteUser);
adminRoutes.get("/admin/users",
    //  tokenVerification, 
     // cookieAuthMiddleware,
    authWithUserMiddleware,
     adminGetUsers);
adminRoutes.get("/admin/user/:userId",
    //  tokenVerification, 
     // cookieAuthMiddleware,
    authWithUserMiddleware,
    adminGetUser);
adminRoutes.put("/admin/user/update/:userId", 
    // tokenVerification,
     // cookieAuthMiddleware,
    authWithUserMiddleware,
     adminUpdateUser);

adminRoutes.get("/admin/users/search", 
        authWithUserMiddleware,
        adminUserSearch);
export default adminRoutes;
