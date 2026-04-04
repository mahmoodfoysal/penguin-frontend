import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user.js";

export const store = configureStore({
  reducer: {
    auth: user,
  },
});
