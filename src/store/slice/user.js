import { createSlice } from "@reduxjs/toolkit";

// get data from sessionStorage
const getUserFromSession = () => {
  const user = sessionStorage.getItem("penguin-shopping");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getUserFromSession(),
  userInfo: {},
  isLoggedIn: !!getUserFromSession(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;

      // save to sessionStorage
      sessionStorage.setItem(
        "penguin-shopping",
        JSON.stringify(action.payload),
      );
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      //   state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;

      sessionStorage.removeItem("penguin-shopping");
    },
  },
});

export const { setUser, logout, setUserInfo } = authSlice.actions;
export default authSlice.reducer;
