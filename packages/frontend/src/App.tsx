import Login from "./pages/auth/Login";
import { useAppSelector } from "./store";
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";

import NotFound from "./pages/404";
import Register from "./pages/auth/Register";
import AllProducts from "./pages/products/AllProducts";
import CreateProduct from "./pages/products/CreateProduct";
import UpdateProduct from "./pages/products/UpdateProduct";
import "./App.css";
import type { AuthState } from "./services/auth/types";
import ProductDetail from "./pages/products/ProductDetail";
import ProductList from "./pages/products/ProductList";
import Admin from "./pages/admin/Admin";
import AdminGetUserDetail from "./pages/admin/AdminGetUserDetail";
import AdminUsersList from "./pages/admin/AdminUsersList";
import AdminCreateUser from "./pages/admin/AdminCreateUser";
import AdminUpdateUser from "./pages/admin/AdminUpdateUser";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/cart/CartPage";
import OrdersPage from "./pages/cart/OrdersPage";
import ProductSearch from "./pages/products/ProductSearch";
import AdminUserSearch from "./pages/admin/AdminUserSearch";

const App = () => {
    // Get user and token from Redux state
    const { user, token } = useAppSelector((state) => state.auth);
    
    // Determine authentication state
    const isAuthenticated = !!(user && token);

    // Define authState based on Redux state
    const authState: AuthState = {
        user,
        token,
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LandingPage authState={authState} isAuthenticated={isAuthenticated} />,
        },
        {
            path: "/auth/",
            children: [
                {
                    path: "register",
                    element: <Register authState={authState} isAuthenticated={isAuthenticated} />,
                },
                {
                    path: "login",
                    element: <Login authState={authState} isAuthenticated={isAuthenticated} />,
                },
            ],
        },
        {
            path: "/products/",
            element: <AllProducts isAuthenticated={isAuthenticated} authState={authState} />,
            children: [
                {
                    path: "",
                    element: <ProductList isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: "create",
                    element: <CreateProduct isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: ":productId", // Route for product details
                    element: <ProductDetail isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: "user/:username/product/edit/:productId", 
                    element: <UpdateProduct isAuthenticated={isAuthenticated} />,
                    loader: ({ params }) => {
                        return { username: params.username, productId: params.productId };
                    },
                },
                {
                    path: "search",
                    element: <ProductSearch isAuthenticated={isAuthenticated} authState={authState} />,
                },
            ],
        },
        {
            path: "/cart",
            element: <CartPage isAuthenticated={isAuthenticated} authState={authState} />,
        },
        {
            path: "/orders",
            element: <OrdersPage isAuthenticated={isAuthenticated} authState={authState} />,
        },
        {
            path: "/admin/",
            element: <Admin isAuthenticated={isAuthenticated} authState={authState} />,
            children: [
                {
                    path: "",
                    element: <AdminUsersList isAuthenticated={isAuthenticated} authState={authState} />, 
                },
                {
                    path: "create",
                    element: <AdminCreateUser isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: ":userId", 
                    element: <AdminGetUserDetail isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: ":userId/update",
                    element: <AdminUpdateUser isAuthenticated={isAuthenticated} authState={authState} />,
                },
                {
                    path: "search",
                    element: <AdminUserSearch isAuthenticated={isAuthenticated} authState={authState} />,
                },
            ],
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ]);

    return (
        <div>  
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
