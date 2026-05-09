import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setUserInfo } from "../store/slice/user";
import { showError } from "../components/Alert";
import { getAuth, signOut } from "firebase/auth";
import initilizationAuthentication from "../firebase/firebase.init";
initilizationAuthentication();

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_PENGUIN_BACKEND_URL,
});

const useAxiosSecure = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Request Interceptor to add Authorization header
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response Interceptor (Dynamic) - Handles logout and redirects
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          // Clear token from storage
          sessionStorage.removeItem("token");

          // Log out from Redux
          signOut(auth)
            .then(() => {
              sessionStorage.removeItem("penguin-shopping");
              sessionStorage.removeItem("token");
              dispatch(logout());
              dispatch(setUserInfo({}));
              navigate("/home");
            })
            .catch((error) => {
              showError(
                "Sign In Failed",
                error.response?.data?.message || error.message,
              );
            });

          dispatch(logout());

          // Show alert to user
          showError(
            "Session Expired",
            "Your session has expired. Please log in again.",
          );

          // Redirect to login
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
