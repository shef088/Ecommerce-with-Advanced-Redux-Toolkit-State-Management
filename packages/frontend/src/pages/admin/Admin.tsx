import React from "react";
import type { AuthState } from "../../services/auth/types";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "../../styles/Admin.css";  // Add the CSS file

const Admin = ({
    isAuthenticated,
    authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
    return (<>
            <Header  />
        <div className="admin-container">
            {isAuthenticated && (
                <div className="admin-link-section">
                    <h4>
                        <Link to="/admin/create">Create User</Link> 
                    </h4>
                </div>
            )}
            <div className="admin-content">
                
                <Outlet />
            </div>
        </div>
            <Footer />
        </>
    );
};

export default Admin;
