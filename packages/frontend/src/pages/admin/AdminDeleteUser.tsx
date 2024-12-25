import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminDeleteUserMutation } from "../../services/auth/authSlice";
import "../../styles/AdminDeleteUser.css"; // Add the CSS file
import { toast } from 'react-toastify';

const AdminDeleteUser = ({ userId }) => {
    const [deleteUser, { isLoading: isDeleting }] = useAdminDeleteUserMutation();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await deleteUser(userId).unwrap();
                toast.success("User deleted successfully");
                navigate("/admin");
            } catch (error) {
                console.error("Failed to delete the user:", error);
                toast.error(error?.error);
                toast.error(error?.data?.error)
                toast.error(error?.data?.message )
            }
        }
    };

    return (
        <button className='delete-button' onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete User"}
        </button>
    );
};

export default AdminDeleteUser;
