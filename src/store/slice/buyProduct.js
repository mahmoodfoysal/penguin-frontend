import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderProduct: {},
};

const buySlice = createSlice({
  name: "buy",
  initialState,
  reducers: {
    setOrderProduct: (state, action) => {
      state.orderProduct = action.payload;
    },
  },
});

export const { setOrderProduct } = buySlice.actions;

export default buySlice.reducer;
