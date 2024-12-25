// types.ts (or wherever you define your types)
export interface CartItem {
    productId: string; // ID of the product
    name: string;      // Name of the product
    price: number;     // Price of the product
    imageUrl: string;  // Image URL of the product
    order_quantity: number; // Quantity ordered (not exceeding stock)
    quantity: number;     // Quantity in stock
}


 
// src/services/cart/types.ts

export interface OrderItem {
    productId: string;
    name: string;
    price: number;
    order_quantity: number;
    imageUrl: string;
}

export interface OrderCreateRequest {
    productId: string; // ID of the product
    name: string;      // Name of the product
    price: number;     // Price of the product
    imageUrl: string;  // Image URL of the product
    order_quantity: number; // Quantity ordered (not exceeding stock)
    quantity: number;     // Quantity in stock
}

export interface OrderCompletedResponse {
    id: string; // The order ID
    userId: string; // User who made the order
    orderItems: OrderItem[]; // Items in the order
    totalAmount: number; // Total amount for the order
    status: string; // Status of the order
    createdAt: string; // Date of creation
    updatedAt: string; // Date of update
}


export interface OrderResponse {
    message?: string;
    status?: number;
    ok?: boolean;
    error?: string;
    reason?: string;
}