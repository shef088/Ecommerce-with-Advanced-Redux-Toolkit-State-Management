import React, { useEffect } from 'react';
import { useFetchOrdersQuery } from '../../services/cart/cartSliceAPI';   
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import "../../styles/OrdersPage.css";  
import { BASE_URL } from '../../constants';

const OrdersPage = () => {
    const { data: orders, error, isLoading, refetch } = useFetchOrdersQuery();
    console.log("orders:", orders); // Debugging: Log the orders data
    useEffect(() => {
        refetch();  // Trigger refetch on component mount
    }, [refetch]);

    return (
        <>
            <Header />
            <div className="orders-page">
                <h1>Your Orders</h1>

                {/* Handle loading and error states within the main return */}
                {isLoading && <div className="loading">Loading your orders...</div>}
                {error && <div className="error">Error loading orders: {error?.message}.</div>}

                {/* Display orders when available */}
                {!isLoading && !error && (
                    orders.length === 0 ? (
                        <p>You have no orders yet.</p>
                    ) : (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    {/* <th>Order N.</th> */}
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Order Time</th> {/* Add Order Time header */}
                                    <th>Completed Time</th> {/* Add Completed Time header */}
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.slice().reverse().map((order,index) => (
                                    <tr key={order.id}>
                                        <td>{orders.length - index}</td>
                                        <td>
                                            {order.orderItems.map((item) => (
                                                <div key={item.productId}>
                                                    <img
                                                        src={`${BASE_URL}/uploads/${item.imageUrl}`}
                                                        alt={item.name}
                                                        className="cart-item-image"
                                                    />
                                                    {item.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {order.orderItems.map((item) => (
                                                <div key={item.productId}>{item.order_quantity}</div>
                                            ))}
                                        </td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                                        <td>{new Date(order.createdAt).toLocaleString()}</td> {/* Display Order Time */}
                                        <td>{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A'}</td> {/* Display Completed Time */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrdersPage;
