import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAdminGetUserQuery } from "../../services/auth/authSlice";
import AdminDeleteUser from "./AdminDeleteUser"; // Importing the AdminDeleteUser component
import "../../styles/AdminGetUserDetail.css"; // Import the CSS file
import { toast } from 'react-toastify';

const AdminGetUserDetail = ({ isAuthenticated, authState }) => {
    const { userId } = useParams<{ userId: string }>();
    const { data, error, isLoading, refetch } = useAdminGetUserQuery(userId); 
    const navigate = useNavigate();

    useEffect(() => {
        // Refetch user details whenever the component is mounted or userId changes
        refetch();
    }, [userId, refetch]);

    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>Error fetching user details: {error?.message  || "Unexpected error occurred."}</div>;
    }

    if (!isAuthenticated && authState?.user?.role !== "admin") {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            {data ? (
                <div>
                    <p>Username: {data.username}</p>
                    <p>Email: {data.email}</p>
                    <p>Role: {data.role}</p>
                    <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(data.updatedAt).toLocaleString()}</p>
                    <div className="actions">
                        {/* Render AdminDeleteUser component and pass userId */}
                        <button 
                            className="edit-button" 
                            onClick={() => navigate(`/admin/${userId}/update`)}
                        >
                            Edit User
                        </button>
                        <AdminDeleteUser userId={userId} />
                     
                    </div>
                </div>
            ) : (
                <div>No user found.</div>
            )}
        </div>
    );
};

export default AdminGetUserDetail;
