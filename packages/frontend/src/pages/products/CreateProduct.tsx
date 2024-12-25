import { type FormEvent, useState } from "react";
import type { ProductCreateRequest } from "../../services/products/types"; // Adjusted import
import { useCreateProductMutation } from "../../services/products/productSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import type { AuthState } from "../../services/auth/types";
import type { ErrorResponse } from "../../services/error-types";
import "../../styles/CreateProduct.css";
import { toast } from 'react-toastify';

const CreateProduct = ({
    isAuthenticated,
    authState,
}: { isAuthenticated: boolean; authState: AuthState }) => {
    const navigate = useNavigate();
    const [createProduct, { isLoading }] = useCreateProductMutation();
    
    // Form data state for product details and image
    const [productFormData, setProductFormData] = useState<ProductCreateRequest>({
        name: "",
        price: 0,
        quantity: 0,
        description: "",
    });
    const [productImage, setProductImage] = useState<File | null>(null); // Image state

    const handleProductSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productFormData.name);
        formData.append("price", productFormData.price.toString());
        formData.append("quantity", productFormData.quantity.toString());
        formData.append("description", productFormData.description);
        console.log("image:", productImage)
        if (productImage) {
            formData.append("image", productImage); // Append image to FormData
        }

        try {
            createProduct(formData) // Send FormData object
                .then((payload) => {
                    if (payload.data?.ok !== undefined && payload.data?.message !== undefined) {
                        if (payload.data?.ok) {
                            toast.success(payload.data?.message);
                            navigate("/products");
                            return;
                        }
                    }
                    const error = payload.error as ErrorResponse | undefined;
                    toast.error(error?.message);
                })
                .catch((error) => {
                    console.log("rejected", error);
                    toast.error("Something went wrong");
                });
        } catch (err) {
            toast.error(`Failed to create product with error: ${err}`);
        }
    };

    return (
        <div className="create-product-container">
            {isAuthenticated ? (
                <>
                    {authState.user?.role === "seller" ? ( // Check if the user is a seller
                        <>
                            <h2>Create Product</h2>
                            <form className="product-form" onSubmit={handleProductSubmit}>
                                <div className="product-inputs">
                                    <input
                                        id="name"
                                        placeholder="Product name"
                                        value={productFormData.name}
                                        type="text"
                                        onChange={(e) =>
                                            setProductFormData({ ...productFormData, name: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        id="price"
                                        placeholder="Product price"
                                        value={productFormData.price}
                                        type="number"
                                        onChange={(e) =>
                                            setProductFormData({ ...productFormData, price: parseFloat(e.target.value) })
                                        }
                                        required
                                    />
                                    <input
                                        id="quantity"
                                        placeholder="Product quantity"
                                        value={productFormData.quantity}
                                        type="number"
                                        onChange={(e) =>
                                            setProductFormData({ ...productFormData, quantity: parseInt(e.target.value) })
                                        }
                                        required
                                    />
                                    <textarea
                                        id="description"
                                        placeholder="Product description"
                                        value={productFormData.description}
                                        onChange={(e) =>
                                            setProductFormData({ ...productFormData, description: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setProductImage(e.target.files ? e.target.files[0] : null)
                                        }
                                        required
                                    />
                                </div>
                                <div className="buttons">
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? "Creating new product..." : "Create product"}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <h2>You do not have permission to create products.</h2>
                    )}
                </>
            ) : (
                <h1>
                    Click <Link to="/">here</Link> to go to the login page
                </h1>
            )}
        </div>
    );
};

export default CreateProduct;
