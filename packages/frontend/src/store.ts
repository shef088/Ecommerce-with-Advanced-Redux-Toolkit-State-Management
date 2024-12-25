import { configureStore } from "@reduxjs/toolkit";
import { authEcomerceApi} from "./services/auth/authSlice";
import { productApi } from "./services/products/productSlice";
import cartReducer from "./services/cart/cartSlice"; 
import authReducer from "./services/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { createListenerMiddleware } from "@reduxjs/toolkit"; 
import { cartSliceAPI } from './services/cart/cartSliceAPI';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';


// Create a listener middleware
const authListener = createListenerMiddleware();

// Configuring redux-persist for auth
const persistAuthConfig = {
    key: 'auth',
    storage,
};

// Configuring redux-persist for cart
const persistCartConfig = {
    key: 'cart',
    storage,
};

// Wrapping reducers with persistReducer
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);

const store = configureStore({
    reducer: {
        [authEcomerceApi.reducerPath]: authEcomerceApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartSliceAPI.reducerPath]: cartSliceAPI.reducer,
        cart: persistedCartReducer, // Use the persisted cart reducer
        auth: persistedAuthReducer, // Use the persisted auth reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false, // Disable serializability checks
        })
        .concat(authEcomerceApi.middleware)
        .concat(productApi.middleware)
        .concat(cartSliceAPI.middleware)
        .concat(authListener.middleware);
    },
});

// Export the persistor
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
