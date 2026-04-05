import { Outlet } from "react-router";
import "./App.css";

import { useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import initilizationAuthentication from "./firebase/firebase.init";
import { useDispatch } from "react-redux";
import { setUser, logout, setUserInfo } from "./store/slice/user";
import NavBar from "./modules/Shared/NavBar/NavBar";
import Footer from "./modules/Shared/Footer/Footer";
initilizationAuthentication();

const auth = getAuth();

function App() {
  const dispatch = useDispatch();
  // get currently signin user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const sessionUser = sessionStorage.getItem("penguin-shopping");

      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photo: firebaseUser.photoURL,
        token: firebaseUser.accessToken,
      };

      dispatch(setUserInfo(userData));

      // ✅ 1. If session exists → use it
      if (sessionUser) {
        dispatch(setUser(JSON.parse(sessionUser)));
        return;
      }

      // ✅ 2. Otherwise use Firebase user
      if (firebaseUser) {
        const token = {
          token: firebaseUser.accessToken,
        };
        dispatch(setUser(token));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default App;
