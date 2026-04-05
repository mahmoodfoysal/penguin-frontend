import { createSlice } from "@reduxjs/toolkit";

// get data from sessionStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("penguin-shopping");
  return cart ? JSON.parse(cart) : null;
};

const initialState = {
  cart: getCartFromLocalStorage(),
  isLoggedIn: !!getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.isLoggedIn = true;

      // save to sessionStorage
      localStorage.setItem("penguin-shopping", JSON.stringify(action.payload));
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
