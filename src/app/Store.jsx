import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ArtSalesAPI } from "../services/ArtSalesAPI";


export const store = configureStore({
    reducer: {
        [ArtSalesAPI.reducerPath]: ArtSalesAPI.reducer,

    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ArtSalesAPI.middleware),
});

setupListeners(store.dispatch);
