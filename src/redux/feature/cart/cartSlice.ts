import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  totalItems: number;
}

const initialState: CartState = {
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Set cart length
    setCartLength: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export const {
  setCartLength,
} = cartSlice.actions;

export default cartSlice.reducer;