import React, { useState } from "react";
import { useSearchProductsQuery } from "../../services/products/productSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css"; // Reuse the same styles as the ProductList
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import { addToCart } from "../../services/cart/cartSlice"; // Import the addToCart action
import { toast } from "react-toastify";

const ProductSearch= ({ isAuthenticated, authState }: { isAuthenticated: boolean; authState: any }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Trigger search API query based on the search term
    const { data: products, error, isLoading } = useSearchProductsQuery(searchTerm, {
        skip: !searchTerm, // Only query if there is a search term
    });
    
    const dispatch = useDispatch();

    // Function to handle adding product to cart
    const handleAddToCart = (product) => {
        dispatch(addToCart({ productId: product.id, name: product.name, price: product.price, quantity: product.quantity, order_quantity:1, imageUrl:product.imageUrl }));
        toast.success("Added to cart!");
    };

    // Handle input change for search
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <h1>Search Products</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            {isLoading && <div className="loading">Searching for products...</div>}
            {error && <div className="error">Error searching products: {error?.message}</div>}

            <div className="product-list">
                {products?.length === 0 && searchTerm && <p>No products found for "{searchTerm}".</p>}
                
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
                        {authState?.user?.role === "shopper" && (
                            <button className="cart-button" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductSearch;
