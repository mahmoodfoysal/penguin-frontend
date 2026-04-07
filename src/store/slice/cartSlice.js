import { createSlice } from "@reduxjs/toolkit";

// ================= LOCAL STORAGE =================
const STORAGE_KEY = "penguin-shopping";

const loadCart = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Failed to load cart:", error);
    return [];
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
};

// ================= INITIAL STATE =================
const initialState = {
  cart: loadCart(),
};

// ================= SLICE =================
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.cart.find((p) => p._id === item._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      saveCart(state.cart);
    },

    // INCREMENT
    incrementQty: (state, action) => {
      const item = state.cart.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCart(state.cart);
      }
    },

    // DECREMENT
    decrementQty: (state, action) => {
      const item = state.cart.find((p) => p._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // remove if quantity becomes 0
        state.cart = state.cart.filter((p) => p._id !== action.payload);
      }

      saveCart(state.cart);
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      saveCart(state.cart);
    },

    // CLEAR CART
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem(STORAGE_KEY);
    },
  },
});

// ================= EXPORT =================
export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
