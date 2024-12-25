import React, { useEffect } from "react";
import { useAdminGetUsersQuery } from "../../services/auth/authSlice";
import { Link } from "react-router-dom";
import "../../styles/AdminUsersList.css"; // Importing the CSS file
import { toast } from 'react-toastify';

const AdminUsersList = ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const { data: users, error, refetch, isLoading } = useAdminGetUsersQuery();

    // Refetch user details whenever the component is mounted
    useEffect(() => {
        refetch();  // Trigger refetch on component mount
    }, [refetch]);

    // Handle loading state
    if (isLoading) {
        return <div>Loading users...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error fetching users: {error?.message  || "Unexpected error occurred "}</div>;
    }

    // Handle unauthorized access
    if (!isAuthenticated || authState?.user?.role !== "admin") {
        return <div>You do not have permission to access this page.</div>;
    }

    // Render user list or no users found message
    return (
        <div className="admin-users-list-container">
            <h2>Users List</h2>
            {users && users.length === 0 ? (
                <div className="no-users-message">No users found.</div>
            ) : (
                <ul className="admin-users-list">
                    {users?.slice().reverse().map((user) => (
                        <li key={user.id}>
                            <Link to={`/admin/${user.id}`}>
                                <span>Username: {user.username}</span> | 
                                <span>Email: {user.email}</span> | 
                                <span>Role: {user.role}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminUsersList;
