// import { createSlice } from "@reduxjs/toolkit";

// // get data from sessionStorage
// const getUserFromSession = () => {
//   const user = sessionStorage.getItem("penguin-shopping");
//   return user ? JSON.parse(user) : null;
// };

// const initialState = {
//   user: getUserFromSession(),
//   userInfo: {},
//   role: {},
//   isLoggedIn: !!getUserFromSession(),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;

//       // save to sessionStorage
//       sessionStorage.setItem(
//         "penguin-shopping",
//         JSON.stringify(action.payload),
//       );
//     },

//     setUserInfo: (state, action) => {
//       state.userInfo = action.payload;
//       //   state.isLoggedIn = true;
//     },
//     setRole: (state, action) => {
//       state.role = action.payload;
//       //   state.isLoggedIn = true;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;

//       sessionStorage.removeItem("penguin-shopping");
//       setRole({});
//     },
//   },
// });

// export const { setUser, logout, setUserInfo, setRole } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const getUserFromSession = () => {
  const user = sessionStorage.getItem("penguin-shopping");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getUserFromSession(),
  userInfo: {},
  role: {},
  isLoggedIn: !!getUserFromSession(),
  isPageLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      sessionStorage.setItem(
        "penguin-shopping",
        JSON.stringify(action.payload),
      );
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setIsPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.userInfo = {};
      state.role = {};
      state.isLoggedIn = false;
      sessionStorage.removeItem("penguin-shopping");
    },
  },
});

export const { setUser, logout, setUserInfo, setRole, setIsPageLoading } =
  authSlice.actions;
export default authSlice.reducer;
