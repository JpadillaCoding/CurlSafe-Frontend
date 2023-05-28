import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ingredients: [],
  status: "idle",
  error: "",
};

export const fetchIngredients = createAsyncThunk("/ingredients", async () => {
  try {
    const response = await axios.get(
      "https://curl-safe.herokuapp.com/ingredients"
    );
    return response.data;
  } catch (error) {
    console.log(error, "Error fetching");
  }
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ingredients = action.payload;
        // why action?
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { actions, reducer } = ingredientsSlice;
