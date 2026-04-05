import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user.js";
import cartSlice from "./slice/cartSlice.js";

export const store = configureStore({
  reducer: {
    auth: user,
    cart: cartSlice,
  },
});
