import { configureStore } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";

export const store = configureStore({
    reducer: {
        homePage: HomePageReducer,
        example: (state = {}) => state,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;