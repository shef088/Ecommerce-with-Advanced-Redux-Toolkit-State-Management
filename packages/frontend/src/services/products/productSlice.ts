import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    ProductCreateRequest,
    ProductDeleteRequest,
    ProductModel,
    ProductResponse,
    
} from "./types";
import { BASE_URL } from "../../constants";
import type { RootState } from "../../store";
import type { ErrorResponse } from "../error-types";

// Define our service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api/`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
        credentials: "include",
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: ["ProductModel"],
    endpoints: (builder) => ({
        searchProducts: builder.query<ProductModel[], string>({
            query: (searchTerm) => `products/products/search?searchTerm=${searchTerm}`,
            transformResponse: (response: { products: ProductModel[] }) => response.products,
          }),
        getAllProducts: builder.query<ProductModel[], void>({
            query: () => "products/products/get-all", // This matches /api/products
            transformResponse: (response: { products: ProductModel[] }) => response.products,
            transformErrorResponse: (response) => response.data as ErrorResponse,
            providesTags: ["ProductModel"],
        }),
   
        getProduct: builder.query<ProductModel, string>({
            query: (productId) => `products/product/${productId}`, // Add the query for a single product
            transformResponse: (response: { product: ProductModel }) => response.product, // Extract the product from the response
            transformErrorResponse: (response) => response.data as ErrorResponse,
            providesTags: ["ProductModel"],
        }),
        getOwnProducts: builder.query<ProductModel[], void>({
            query: () => "products/products/seller",  
            transformResponse: (response: { products: ProductModel[] }) => response.products,
            transformErrorResponse: (response) => response.data as ErrorResponse,
            providesTags: ["ProductModel"],
        }),
        createProduct: builder.mutation<ProductResponse, ProductCreateRequest>({
            query: (body) => ({
                url: "products/product/create", 
                method: "POST",
                credentials: "include",
                body,
            }),
            invalidatesTags: ["ProductModel"],
            transformErrorResponse: (response) => response.data as ErrorResponse,
        }),
        deleteProduct: builder.mutation<ProductResponse, ProductDeleteRequest>({
            query: ({ productId }) => ({
                url: `products/product/delete/${productId}`, // This matches /api/products/product/delete/:productId
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: ["ProductModel"],
            transformErrorResponse: (response) => response.data as ErrorResponse,
        }),
        updateProduct: builder.mutation<ProductResponse, { productId: string; formData: FormData }>({
            query: ({ productId, formData }) => ({
                url: `products/product/update/${productId}`,
                method: "PUT",
                credentials: "include",
                body: formData, 
            }),
            invalidatesTags: ["ProductModel"],
            transformErrorResponse: (response) => response.data as ErrorResponse,
        }),
    }),
});

// Exporting the generated methods from createApi
export const {
    useGetProductQuery,
    useGetAllProductsQuery,
    useGetOwnProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useSearchProductsQuery,
} = productApi;

// Don't forget to export the reducer
export default productApi.reducer;
