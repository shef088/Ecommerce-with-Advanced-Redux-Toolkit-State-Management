import React, { useState } from "react";
import { useAdminSearchUsersQuery } from "../../services/auth/authSlice"; // Assuming you have a search query hook for users
import { Link } from "react-router-dom";
import "../../styles/AdminUsersList.css"; // Reuse the existing admin user list styles
import { toast } from "react-toastify";

const AdminUserSearch = ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Trigger search API query for users based on search term
    const { data: users, error, isLoading } = useAdminSearchUsersQuery(searchTerm, {
        skip: !searchTerm, // Skip query if there's no search term
    });
    console.log("users:", users)
    
    // Handle input change for search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle unauthorized access
    if (!isAuthenticated || authState?.user?.role !== "admin") {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <>
            <h1>Search Users</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for users by username or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {isLoading && <div className="loading">Searching for users...</div>}
            {error && <div className="error">Error searching users: {error?.message}</div>}

            {/* Display users when available */}
            <div className="admin-users-list-container">
                {users?.length === 0 && searchTerm && <p>No users found for "{searchTerm}".</p>}

                <ul className="admin-users-list">
                    {users?.map((user) => (
                        <li key={user.id}>
                            <Link to={`/admin/${user.id}`}>
                                <span>Username: {user.username}</span> |
                                <span>Email: {user.email}</span> |
                                <span>Role: {user.role}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AdminUserSearch;
