import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "../../services/products/productSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/cart/cartSlice"; // Import the addToCart action
import DeleteProduct from "./DeleteProduct"; // Importing the DeleteProduct component
import "../../styles/ProductDetail.css";  
import { BASE_URL } from "../../constants";
import { toast } from 'react-toastify';

const ProductDetail = ({ isAuthenticated, authState }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch the product details using the productId
    const { data: product, error, isLoading, refetch } = useGetProductQuery(productId);

    useEffect(() => {
        // Refetch product details whenever the component is mounted or productId changes
        refetch();
    }, [productId, refetch]);

    if (isLoading) return <div className="loading">Loading product details...</div>;
    if (error) return <div className="error">Error loading product details.: {error?.message }</div>;

    // Function to handle redirect to edit page
    const handleEdit = () => {
        navigate(`/products/user/${authState.user.username}/product/edit/${product.id}`);
    };

    // Function to handle adding product to cart
    const handleAddToCart = () => {
        dispatch(addToCart({ productId: product.id, name: product.name, price: product.price, quantity: product.quantity, order_quantity:1, imageUrl:product.imageUrl }));
        toast.success("Added to cart!");
    };

    return (
        <div className="product-detail">
            <h1 className="product-title">{product.name}</h1>
            <img src={`${BASE_URL}/uploads/${product.imageUrl}`} alt={product.name} className="product-image" />
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-quantity">In Stock: {product.quantity}</p>
            <p className="product-description">Description: {product.description}</p>

            {/* Show Edit and Delete buttons only if the user is the product's seller */}
            {isAuthenticated && product.sellerId === authState.user.id && authState?.user?.role === "seller" && (
                <div className="action-buttons">
                    <button className="edit-button" onClick={handleEdit}>Edit Product</button>
                    <DeleteProduct productId={productId} />
                </div>
            )}

            {/* Add to Cart button for all users */}
            {authState?.user?.role === "shopper" && <button className="cart-button" onClick={handleAddToCart}>Add to Cart</button>}
        </div>
    );
};

export default ProductDetail;
