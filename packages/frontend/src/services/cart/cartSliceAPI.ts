import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartItem, OrderCompletedResponse, OrderCreateRequest, OrderResponse } from "./types"; // Import CartItem type
import { BASE_URL } from '../../constants';
import { ErrorResponse } from '../error-types';


export const cartSliceAPI = createApi({
    reducerPath: 'cartSliceAPI',
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
    tagTypes: ["CartItem"],
    endpoints: (builder) => ({
        checkout: builder.mutation<OrderResponse, OrderCreateRequest[]>({
            query: (cartItems) => ({
                url: 'orders/checkout',
                method: 'POST',
                body: cartItems,
            }),
        }),
        fetchOrders: builder.query<OrderCompletedResponse[], void>({
            query: () => 'orders/orders',  
            transformResponse: (response: { orders:OrderCompletedResponse[] }) => response.orders,
            transformErrorResponse: (response) => response.data as ErrorResponse,
            providesTags: ["CartItem"],
        }),
        
    }),
});

// Export the auto-generated hooks
export const { useCheckoutMutation, useFetchOrdersQuery } = cartSliceAPI;
