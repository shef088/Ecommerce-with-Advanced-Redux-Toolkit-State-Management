export interface ProductModel {
    id: string; // Unique identifier for the product
    name: string;
    price: number;
    description: string;
    quantity: number; // Using quantity instead of stock
}

export type AllProductResponse = {
    message: string;
    status: number;
    ok: boolean;
    products: ProductModel[]; // Array of products
};

export interface ProductCreateRequest {
    name: string;
    price: number;
    description: string;
    quantity: number; // Required for creating a product
}

export interface ProductDeleteRequest {
    id: string; // ID of the product to delete
}

export interface ProductUpdateRequest extends ProductDeleteRequest {
    name?: string; // Optional, in case you want to update these fields
    price?: number; // Optional
    description?: string; // Optional
    quantity?: number; // Optional
}

export interface ProductResponse {
    message?: string;
    status?: number;
    ok?: boolean;
    error?: string;
    reason?: string;
}
