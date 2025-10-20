import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./feature/baseApi";
import authReducer from "./feature/auth/authSlice";
import profileReducer from "./feature/profile/profileSlice";
import cartReducer from "./feature/cart/cartSlice";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
        profile: profileReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;