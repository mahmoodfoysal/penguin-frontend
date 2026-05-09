import { Outlet, ScrollRestoration } from "react-router-dom";
import "./App.css";

import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import initilizationAuthentication from "./firebase/firebase.init";
import { useDispatch } from "react-redux";
import {
  setUser,
  logout,
  setUserInfo,
  setRole,
  setIsPageLoading,
} from "./store/slice/user";
import NavBar from "./modules/shared/NavBar/NavBar.jsx";

import Footer from "./modules/shared/Footer/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop";
import useAxiosSecure from "./hooks/useAxiosSecure";

initilizationAuthentication();

const auth = getAuth();

function App() {
  const dispatch = useDispatch();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    dispatch(setIsPageLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const sessionUser = sessionStorage.getItem("penguin-shopping");

      if (!firebaseUser) {
        dispatch(logout());
        dispatch(setIsPageLoading(false));
        return;
      }

      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL,
        token: firebaseUser.accessToken,
      };

      dispatch(setUserInfo(userData));

      if (firebaseUser) {
        const loggedUser = { email: firebaseUser?.email };

        fetch(`${import.meta.env.VITE_PENGUIN_BACKEND_URL}/get-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            sessionStorage.setItem("token", data.token);
          })
          .catch((err) => console.log(err));
      }

      if (sessionUser) {
        dispatch(setUser(JSON.parse(sessionUser)));
      } else {
        dispatch(setUser({ token: firebaseUser.accessToken }));
      }

      try {
        const response = await axiosSecure.get(
          `/admin/get-admin-list/${userData.email}`,
        );

        dispatch(setRole(response.data));
      } catch (error) {
        console.log("Admin API error:", error);
      }
      dispatch(setIsPageLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div className="bg-base-100 text-base-content min-h-screen font-body selection:bg-accent selection:text-white relative">
      <ScrollRestoration />
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
    </div>
  );
}

export default App;
