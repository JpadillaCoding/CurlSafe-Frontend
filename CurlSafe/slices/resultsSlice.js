import { createSlice } from "@reduxjs/toolkit";

export const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    value: null
  },
  reducers: {
    setResults: (state, action) => {
        state.value = action.payload
    }
  }
})

export const { setResults } = counterSlice.actions

export default resultsSlice.reducer