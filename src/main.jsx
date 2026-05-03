import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClickToComponent } from "click-to-react-component";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./modules/client/Home/Home/Home";
import AdminHome from "./modules/dashboard/Home/AdminHome.jsx";
import Products from "./modules/client/Products/Products.jsx";
import ProductDetails from "./modules/client/ProductDetrails/ProductDetails.jsx";
import Cart from "./modules/client/Cart/Cart.jsx";
import Checkout from "./modules/client/Checkout/Checkout.jsx";
import Login from "./modules/Authentication/Login/Login.jsx";
import MakeAdmin from "./modules/dashboard/MakeAdmin/MakeAdmin.jsx";
import ParentCategory from "./modules/dashboard/ParentCategory/ParentCategory.jsx";
import SubCategory from "./modules/dashboard/SubCategory/SubCategory.jsx";
import AddBlogs from "./modules/dashboard/AddBlogs/AddBlogs.jsx";
import AddProduct from "./modules/dashboard/AddProduct/AddProduct.jsx";
import PendingOrder from "./modules/dashboard/PendingOrder/PendingOrder.jsx";
import Contact from "./modules/shared/Contact/Contact.jsx";
import AboutUs from "./modules/shared/AboutUs/AboutUs.jsx";
import DashboardHome from "./modules/dashboard/Home/DashboardHome.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import DirectCheckOut from "./modules/client/Checkout/DirectCheckOut.jsx";
import PublicRoutes from "./Routes/PublicRoutes.jsx";
import Blogs from "./modules/client/Blogs/Blogs.jsx";
import BlogDetails from "./modules/client/BlogDetails/BlogDetails.jsx";
import OrderHistory from "./modules/client/OrderHistory/OrderHistory.jsx";
import CustomerProfile from "./modules/client/CustomerProfile/CustomerProfile.jsx";
import CouponDiscount from "./modules/dashboard/CouponDiscount/CouponDiscount.jsx";
import axios from "axios";
import Review from "./modules/dashboard/Review/Review.jsx";

// Set global axios timeout for Render's free tier cold starts
axios.defaults.timeout = 60000;

// ------------------
// ✅ Utility: fetch with timeout (FIXED)
// ------------------

// ------------------
// ✅ Router
// ------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, // global error handling
    children: [
      { index: true, element: <Navigate to="/home" /> },

      { path: "home", element: <Home /> },

      { path: "products", element: <Products /> },

      {
        path: "product-details/:id/:prod_id",
        element: <ProductDetails />,
      },

      { path: "cart", element: <Cart /> },

      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },

      {
        path: "buy-product",
        element: (
          <PrivateRoute>
            <DirectCheckOut />
          </PrivateRoute>
        ),
      },

      {
        path: "login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },

      { path: "contact", element: <Contact /> },
      { path: "about", element: <AboutUs /> },
      { path: "blogs", element: <Blogs /> },
      {
        path: "blog-details/:id",
        element: <BlogDetails />,
      },

      {
        path: "order-history",
        element: (
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <CustomerProfile></CustomerProfile>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },

          {
            path: "make-admin",
            element: <MakeAdmin />,
          },

          {
            path: "parent-category",
            element: <ParentCategory />,
          },
          {
            path: "sub-category",
            element: <SubCategory />,
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "add-blogs",
            element: <AddBlogs />,
          },
          {
            path: "pending-order",
            element: <PendingOrder />,
          },
          {
            path: "warehouse",
            element: <PendingOrder />,
          },
          {
            path: "shipping",
            element: <PendingOrder />,
          },
          {
            path: "delivery",
            element: <PendingOrder />,
          },
          {
            path: "completed",
            element: <PendingOrder />,
          },
          {
            path: "rejected",
            element: <PendingOrder />,
          },
          {
            path: "coupon-discount",
            element: <CouponDiscount />,
          },
          {
            path: "review",
            element: <Review />,
          },
        ],
      },
    ],
  },
]);

// ------------------
// ✅ Render App
// ------------------
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ClickToComponent />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
