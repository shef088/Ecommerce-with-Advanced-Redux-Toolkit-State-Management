import React from "react";
import { useGetAllProductsQuery, useGetOwnProductsQuery } from "../../services/products/productSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css"; 
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/cart/cartSlice"; // Import the addToCart action
import { toast } from 'react-toastify';

const ProductList = ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const { data: products, error, isLoading } = 
        authState?.user?.role === "seller" ? useGetOwnProductsQuery() : useGetAllProductsQuery();  
    console.log(authState);
    const dispatch = useDispatch();

   // Function to handle adding product to cart
   const handleAddToCart = (product) => {
    dispatch(addToCart({ productId: product.id, name: product.name, price: product.price, quantity: product.quantity, order_quantity:1, imageUrl:product.imageUrl }));
    toast.success("Added to cart!");
};

    if (isLoading) {
        return (
            <div className="loading"> 
                {authState?.user?.role === "seller" && isAuthenticated? "Loading your products..." : "Loading products..." }
            </div>
        );
    }

    if (error) {
        return <div className="error">Error loading products: {error?.message }.</div>;
    }

    return (
        <>
         <h1>{authState?.user?.role === "seller" ? "Your Seller Products" : "Products"}</h1>
         {products.length === 0 && <p>No Products Found!</p>}
        <div className="product-list">
           
            {products?.slice().reverse().map((product) => (
                <div key={product.id} className="product-item">
                    <Link to={`/products/${product.id}`} className="product-link">
                        <img 
                            src={`${BASE_URL}/uploads/${product.imageUrl}`} 
                            alt={product.name} 
                            className="product-image" 
                        />
                        <h2>{product.name}</h2>
                    </Link>
                    <p className="product-price">${product.price}</p>
                    {authState?.user?.role === "shopper" && <button className="cart-button" onClick={()=>handleAddToCart(product)}>Add to Cart</button>
                }
                </div>
            ))}
        </div>
        </>
    );
};

export default ProductList;
