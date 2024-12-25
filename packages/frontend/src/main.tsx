import { StrictMode } from "react";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store, { persistor } from "./store.ts";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer position="top-left" />
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
