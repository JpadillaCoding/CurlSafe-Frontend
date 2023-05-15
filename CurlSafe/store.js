import {configureStore} from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultsSlice";

export const store = configureStore({
    reducer: {
        results: resultsReducer,
    },
});