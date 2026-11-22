import { configureStore, Middleware } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import { logger as reduxLogger } from "redux-logger";
import ProductsPageReducer from "./screens/productsPage/slice";


export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reduxLogger as Middleware),

    reducer: {
        homePage: HomePageReducer,
        example: (state = {}) => state,
        productsPage: ProductsPageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
