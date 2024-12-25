import React, { useState } from "react";
import { useAdminCreateUserMutation } from "../../services/auth/authSlice";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminCreateUser.css"; 
import { toast } from 'react-toastify';

const AdminCreateUser = ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const navigate = useNavigate();
    const [createUser, { isLoading }] = useAdminCreateUserMutation();
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        role: "shopper", // Default role
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(formState).unwrap();
            toast.success("Created user sucessfully!")
            navigate("/admin");
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error(error?.error);
            toast.error(error?.data?.error)
            toast.error(error?.data?.message )
        }
    };

    if (!isAuthenticated || authState?.user?.role !== "admin") {
        return <div>You do not have permission to access this page.</div>;
    }

    return (
        <div className="admin-create-user">
            <h2>Create a New User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formState.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={formState.role}
                    onChange={handleChange}
                    required
                >
                    <option value="shopper">Shopper</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating User..." : "Create User"}
                </button>
            </form>
        </div>
    );
};

export default AdminCreateUser;
