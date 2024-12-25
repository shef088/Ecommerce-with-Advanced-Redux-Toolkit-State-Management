import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    useAdminGetUserQuery,
    useAdminUpdateUserMutation,
} from "../../services/auth/authSlice";
import "../../styles/AdminUpdateUser.css"; // Importing the CSS file
import { toast } from 'react-toastify';

const AdminUpdateUser = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data: userData, error, isLoading } = useAdminGetUserQuery(userId);
    const [updateUser, { isLoading: isUpdating }] = useAdminUpdateUserMutation();

    const [formState, setFormState] = useState({
        username: "",
        email: "",
        role: "",  // Add role to form state
    });

    const navigate = useNavigate();

    // When userData is available, populate form state with user details
    useEffect(() => {
        if (userData) {
            setFormState({
                username: userData.username,
                email: userData.email,
                role: userData.role,  // Initialize role with the user's current role
            });
        }
    }, [userData]);

    // Handle form submission to update user
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        try {
            await updateUser({ userId, ...formState }).unwrap();
            toast.success("Updated user sucessfully!")
            navigate(`/admin/${userId}`);
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error(error?.error);
            toast.error(error?.data?.error)
            toast.error(error?.data?.message )
        }
    } catch (error) {
        toast.error(error)
    }
    };

    // Handle input change for form fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>Error fetching user details: {error.data?.message || "Unexpected error occurred."}</div>;
    }

    return (
        <form className="admin-update-user-form" onSubmit={handleUpdate}>
            <h2>Edit User</h2>
            
            {/* Username field */}
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formState.username}
                    onChange={handleInputChange}
                    required
                />
            </label>
            
            {/* Email field */}
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                />
            </label>

            {/* Role field */}
            <label>
                Role:
                <select
                    name="role"
                    value={formState.role}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select role</option>
                    <option value="shopper">Shopper</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>

                </select>
            </label>

            {/* Submit button */}
            <button type="submit" disabled={isUpdating}>
                {isUpdating ? "Updating..." : "Update User"}
            </button>
        </form>
    );
};

export default AdminUpdateUser;
