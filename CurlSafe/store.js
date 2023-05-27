import {configureStore} from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultsSlice";
import { reducer as ingredientsReducer } from "./slices/ingredientsSlice"

export const store = configureStore({
    reducer: {
        results: resultsReducer,
        ingredients: ingredientsReducer
    },
});