import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import { logger as reduxLogger } from "redux-logger";
import ProductsPageReducer from "./screens/productsPage/slice";


export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        //@ts-ignore
        getDefaultMiddleware().concat(reduxLogger),

    reducer: {
        homePage: HomePageReducer,
        example: (state = {}) => state,
        productsPage: ProductsPageReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;