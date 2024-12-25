import React from "react";
import type { AuthState } from "../../services/auth/types";
import { Outlet, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles/AllProducts.css"; // Import the styles

const AllProducts = ({
	isAuthenticated,
	authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
    return (
        <>
            <Header/>
            <div className="all-products-container">
                {authState?.user?.role ==="seller" && <h4>  <Link to="/products/create" >Create a new product</Link> </h4> }
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
