import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store';
import { removeFromCart, incrementQuantity, decrementQuantity, clearCart } from '../../services/cart/cartSlice';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import "../../styles/CartPage.css";
import { BASE_URL } from '../../constants';
import { useCheckoutMutation } from '../../services/cart/cartSliceAPI'; // Import the checkout mutation
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const [checkout] = useCheckoutMutation(); // Use the checkout mutation
    const navigate = useNavigate();
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * (item.order_quantity || 0), 0);

    const handleCheckout = async () => {
        try {
            await checkout(cartItems).unwrap(); // Submit the cart items
            toast.success('Checkout successful!');
            dispatch(clearCart()); // Clear the cart after successful checkout
            navigate('/orders');
        } catch (error) {
             
            toast.error(error?.data?.error)
            toast.error(error?.data?.message )
        }
    };

    return (
        <>
            <Header />
            <div className="cart-page">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <table className="cart-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.productId}>
                                        <td>
                                            <img
                                                src={`${BASE_URL}/uploads/${item.imageUrl}`}
                                                alt={item.name}
                                                className="cart-item-image"
                                            />
                                        </td>
                                        <td>{item.name}</td>
                                        <td>${item.price}</td>
                                        <td>
                                            <div className="quantity-control">
                                                <button onClick={() => dispatch(decrementQuantity(item.productId))}>-</button>
                                                <span>{item.order_quantity || 0}</span>
                                                <button onClick={() => dispatch(incrementQuantity(item.productId))}>+</button>
                                            </div>
                                        </td>
                                        <td>${(item.price * (item.order_quantity || 0)).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="total-row">
                                    <td colSpan={4}>Total:</td>
                                    <td colSpan={2}>${totalPrice.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="checkout-button" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CartPage;
