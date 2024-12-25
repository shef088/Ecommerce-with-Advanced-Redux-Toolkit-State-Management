import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './types'; // Import your CartItem type

interface CartState {
    items: CartItem[]; // Array of cart items
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = state.items.find((item) => item.productId === action.payload.productId);
            if (item) {
                // Ensure the order quantity does not exceed the stock
                const newQuantity = item.order_quantity + action.payload.order_quantity; // Calculate the new quantity
                if (newQuantity <= item.quantity) {
                    item.order_quantity = newQuantity; // Increment order quantity
                } else {
                    item.order_quantity = item.quantity; // Set to max stock if exceeded
                }
            } else {
                // Ensure the order quantity is initialized and doesn't exceed stock
                const order_quantity = Math.min(action.payload.order_quantity || 1, action.payload.quantity);
                state.items.push({ ...action.payload, order_quantity }); // Add new item with order_quantity
            }
        },
        
    
        removeFromCart(state, action: PayloadAction<string>) {
            console.log("3")
            state.items = state.items.filter((item) => item.productId !== action.payload);
        },
        incrementQuantity(state, action: PayloadAction<string>) {
            console.log("4")
            const item = state.items.find((item) => item.productId === action.payload);
        
            if (item && item.order_quantity < item.quantity) {
                item.order_quantity += 1; // Increment order quantity
            }
        },
        decrementQuantity(state, action: PayloadAction<string>) {
            console.log("5")
            const item = state.items.find((item) => item.productId === action.payload);
            if (item && item.order_quantity > 1) {
                item.order_quantity -= 1; // Decrement order quantity
            }
        },
        clearCart(state) {
            state.items = []; // Clear the cart
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = cartSlice.actions;

// Selector to get the total cart item count
export const selectCartCount = (state: { cart: CartState }) => {
    console.log("Cart items:", state.cart.items); // Log cart items for debugging
    const totalCount = state.cart.items.reduce((total, item) => total + item.order_quantity, 0);
    return isNaN(totalCount) ? 0 : totalCount; // Handle NaN gracefully
};

// Export the reducer
export default cartSlice.reducer;
