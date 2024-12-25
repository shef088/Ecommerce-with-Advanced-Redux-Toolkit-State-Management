import React, { useState, useEffect, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../../services/products/productSlice";
import "../../styles/UpdateProduct.css"; // Importing the CSS file
import { ProductCreateRequest } from "../../services/products/types";
import { toast } from 'react-toastify';

const UpdateProduct = ({ isAuthenticated }) => {
    const { productId } = useParams(); // Get productId from URL
    const navigate = useNavigate();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    
    // Fetch the product details using productId
    const { data: product, error, isLoading } = useGetProductQuery(productId);
    
    // State for the product image
    const [productImage, setProductImage] = useState<File | null>(null);
    
    // Define state for form fields
    const [formState, setFormState] = useState<ProductCreateRequest>({
        name: "",
        price: "",
        quantity: "",
        description: "",
    });

    // Update formState with product data when product is fetched
    useEffect(() => {
        if (product) {
            setFormState({
                name: product.name || "", // Default to empty string if undefined
                price: product.price?.toString() || "", // Ensure price is a string
                quantity: product.quantity?.toString() || "", // Ensure quantity is a string
                description: product.description || "",
            });
        }
    }, [product]);

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Create FormData object
        const formData = new FormData();
        formData.append("name", formState.name);
        formData.append("price", formState.price);
        formData.append("quantity", formState.quantity);
        formData.append("description", formState.description);

        // Debugging: Log formData before appending image
        console.log("Before appending image, FormData values:");
        console.log("Name:", formState.name);
        console.log("Price:", formState.price);
        console.log("In Stock:", formState.quantity);
        console.log("Description:", formState.description);
        
        if (productImage) {
            formData.append("image", productImage); 
        }

        // Debugging: Log FormData after all appends
        console.log("FormData contents after append:", Array.from(formData.entries()));

        try {
            await updateProduct({ productId, formData }).unwrap();
            toast.success("Product updated successfully");
            navigate(`/products/${productId}`);
        } catch (error) {
            console.error("Failed to update product", error);
            toast.error(error?.error);
            toast.error(error?.data?.error)
            toast.error(error?.data?.message )
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    if (isLoading) return <div>Loading product details...</div>;
    if (error) return <div>Error loading product details.</div>;

    return (
        <div className="edit-product-container">
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit} className="edit-product-form">
                <div className="form-group">
                    <label htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formState.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formState.quantity}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formState.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Product Image</label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files ? e.target.files[0] : null)}
                    />
                </div>
                <button type="submit" disabled={isUpdating} className="submit-button">
                    {isUpdating ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
