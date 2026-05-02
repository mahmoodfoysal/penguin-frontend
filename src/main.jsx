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

// ------------------
// ✅ Utility: fetch with timeout (FIXED)
// ------------------
const fetchWithTimeout = async (url, options = {}, timeout = 7000) => {
  const res = await Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout),
    ),
  ]);

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

// ------------------
// ✅ Loaders
// ------------------
const productLoader = async () => {
  const products = await fetchWithTimeout(
    `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list`,
  );
  return { products };
};

const orderLoader = async () => {
  const orders = await fetchWithTimeout(
    `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-order-list`,
  );
  return { orders };
};

const adminLoader = async () => {
  const adminData = await fetchWithTimeout(
    `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-admin-list`,
  );
  return { adminData };
};

const parentCategoryLoader = async () => {
  const parentCategoryData = await fetchWithTimeout(
    `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-parent-category`,
  );
  return { parentCategoryData };
};

const subCategoryLoader = async () => {
  const subCategoryData = await fetchWithTimeout(
    `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/admin/get-sub-category`,
  );
  return { subCategoryData };
};

const productsLoader = async () => {
  const [products, categories] = await Promise.all([
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list`,
    ),
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/client/get-all-categories`,
    ),
  ]);

  return { products, categories };
};

const productDetailsLoader = async ({ params }) => {
  const [products, product_details, comments] = await Promise.all([
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list`,
    ),
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
    ),
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-review-list/${params.prod_id}`,
    ),
  ]);

  return { products, product_details, comments };
};

const blogDetailsLoader = async ({ params }) => {
  const [blogs, blogDetails] = await Promise.all([
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list`,
    ),
    fetchWithTimeout(
      `${import.meta.env.VITE_PENGUIN_BACKEND_URL}/api/penguin/get-blog-list/${params.id}`,
    ),
  ]);

  return { blogs, blogDetails };
};

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

      { path: "home", element: <Home />, loader: productLoader },

      { path: "products", element: <Products />, loader: productsLoader },

      {
        path: "product-details/:id/:prod_id",
        element: <ProductDetails />,
        loader: productDetailsLoader,
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
        loader: blogDetailsLoader,
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
            loader: adminLoader,
          },

          {
            path: "parent-category",
            element: <ParentCategory />,
            loader: parentCategoryLoader,
          },
          {
            path: "sub-category",
            element: <SubCategory />,
            loader: () =>
              Promise.all([parentCategoryLoader(), subCategoryLoader()]),
          },
          {
            path: "add-product",
            element: <AddProduct />,
            loader: () =>
              Promise.all([
                parentCategoryLoader(),
                subCategoryLoader(),
                productLoader(),
              ]),
          },
          {
            path: "pending-order",
            element: <PendingOrder />,
            loader: orderLoader,
          },
          {
            path: "warehouse",
            element: <PendingOrder />,
            loader: orderLoader,
          },
          {
            path: "shipping",
            element: <PendingOrder />,
            loader: orderLoader,
          },
          {
            path: "delivery",
            element: <PendingOrder />,
            loader: orderLoader,
          },
          {
            path: "completed",
            element: <PendingOrder />,
            loader: orderLoader,
          },
          {
            path: "rejected",
            element: <PendingOrder />,
            loader: orderLoader,
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
