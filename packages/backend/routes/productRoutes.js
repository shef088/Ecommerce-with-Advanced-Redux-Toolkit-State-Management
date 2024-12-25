import { Router } from "express";
import createProduct from "../controllers/access/controls/product/createProduct.js";
import deleteProduct from "../controllers/access/controls/product/deleteProduct.js";
import getAllProducts from "../controllers/access/controls/product/getAllProducts.js";
import updateProduct from "../controllers/access/controls/product/updateProduct.js";
import getProduct from "../controllers/access/controls/product/getProduct.js";
import getSellerProducts from "../controllers/access/controls/product/getSellerProducts.js";
import tokenVerification from "../security/authentication.js";
import upload from "../security//upload.js"; // Import the multer middleware
import authWithUserMiddleware from "../security/authwithUserMiddleware.js";
import cookieAuthMiddleware from "../security/cookieAuthMiddleware.js";
import searchProducts from "../controllers/access/controls/product/searchProducts.js";


const productControlRoutes = Router({ mergeParams: true });

// Add upload middleware to the create product route
productControlRoutes.post("/product/create",
    //  tokenVerification, 
     // cookieAuthMiddleware,
     authWithUserMiddleware,
    upload.single("image"),
     createProduct);

productControlRoutes.delete("/product/delete/:productId",
    //  tokenVerification, 
     // cookieAuthMiddleware,
     authWithUserMiddleware,
     deleteProduct);
productControlRoutes.put("/product/update/:productId",
    //  tokenVerification, 
    //  cookieAuthMiddleware,
     authWithUserMiddleware,
     upload.single("image"), 
     updateProduct);

 

productControlRoutes.get("/product/:productId", 
    // tokenVerification, 
    authWithUserMiddleware,
    getProduct);
productControlRoutes.get("/products/get-all",
    //   tokenVerification, 
      authWithUserMiddleware,
      getAllProducts);
productControlRoutes.get("/products/seller", 
    // tokenVerification,
    authWithUserMiddleware,
     getSellerProducts);
productControlRoutes.get("/products/search", 
        authWithUserMiddleware,
        searchProducts);
export default productControlRoutes;
