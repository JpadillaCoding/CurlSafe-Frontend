import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    ingredients: [],
    error: ''
}

export const fetchIngredients = createAsyncThunk('ingredients', () => {
    return axios.get('https://curl-safe.herokuapp.com/ingredients')
    .then((response) => console.log(response))
})

export const resultsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: {

  }

})

export const { setResults } = resultsSlice.actions

export default resultsSlice.reducer