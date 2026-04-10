// import { StrictMode } from "react";
// import { Provider } from "react-redux";
// import { store } from "./store/store.js";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { ClickToComponent } from "click-to-react-component";
// import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
// import Home from "./modules/client/Home/Home/Home";
// import AdminHome from "./modules/dashboard/Home/AdminHome.jsx";
// import Products from "./modules/client/Products/Products.jsx";
// import ProductDetails from "./modules/client/ProductDetrails/ProductDetails.jsx";
// import Cart from "./modules/client/Cart/Cart.jsx";
// import Checkout from "./modules/client/Checkout/Checkout.jsx";
// import Login from "./modules/Authentication/Login/Login.jsx";
// import MakeAdmin from "./modules/dashboard/MakeAdmin/MakeAdmin.jsx";
// import ParentCategory from "./modules/dashboard/ParentCategory/ParentCategory.jsx";
// import SubCategory from "./modules/dashboard/SubCategory/SubCategory.jsx";
// import AddProduct from "./modules/dashboard/AddProduct/AddProduct.jsx";
// import PendingOrder from "./modules/dashboard/PendingOrder/PendingOrder.jsx";
// import Contact from "./modules/shared/Contact/Contact.jsx";
// import AboutUs from "./modules/shared/AboutUs/AboutUs.jsx";
// import DashboardHome from "./modules/dashboard/Home/DashboardHome.jsx";
// import PrivateRoute from "./Routes/PrivateRoute.jsx";
// import AdminRoute from "./Routes/AdminRoute.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
// import DirectCheckOut from "./modules/client/Checkout/DirectCheckOut.jsx";
// import PublicRoutes from "./Routes/PublicRoutes.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App></App>,
//     children: [
//       { index: true, element: <Navigate to="/home" /> },
//       {
//         path: "home",
//         element: <Home></Home>,
//         loader: async () =>
//           await fetch(
//             "https://api-penguin.onrender.com/api/penguin/get-product-list",
//           ),
//       },
//       {
//         path: "products",
//         element: <Products></Products>,
//         loader: async () => {
//           const products = await fetch(
//             "https://api-penguin.onrender.com/api/penguin/get-product-list",
//           );
//           const categories = await fetch(
//             "https://api-penguin.onrender.com/api/client/get-all-categories",
//           );
//           return {
//             products: await products.json(),
//             categories: await categories.json(),
//           };
//         },
//       },
//       {
//         path: "product-details/:id/:prod_id",
//         element: <ProductDetails></ProductDetails>,
//         loader: async ({ params }) => {
//           const products = await fetch(
//             "https://api-penguin.onrender.com/api/penguin/get-product-list",
//           );
//           const details = await fetch(
//             `https://api-penguin.onrender.com/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
//           );
//           return {
//             products: await products.json(),
//             product_details: await details.json(),
//           };
//         },
//       },
//       {
//         path: "cart",
//         element: <Cart></Cart>,
//       },
//       {
//         path: "checkout",
//         element: (
//           <PrivateRoute>
//             <Checkout></Checkout>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "buy-product",
//         element: (
//           <PrivateRoute>
//             <DirectCheckOut></DirectCheckOut>
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "login",
//         element: (
//           <PublicRoutes>
//             <Login></Login>
//           </PublicRoutes>
//         ),
//       },
//       {
//         path: "contact",
//         element: <Contact></Contact>,
//       },
//       {
//         path: "about",
//         element: <AboutUs></AboutUs>,
//       },
//       {
//         path: "/dashboard",
//         element: (
//           <AdminRoute>
//             <AdminHome></AdminHome>
//           </AdminRoute>
//         ),
//         children: [
//           {
//             index: true,
//             element: (
//               <AdminRoute>
//                 <DashboardHome></DashboardHome>
//               </AdminRoute>
//             ),
//           },
//           {
//             path: "/dashboard/make-admin",
//             element: (
//               <AdminRoute>
//                 <MakeAdmin></MakeAdmin>
//               </AdminRoute>
//             ),
//           },
//           {
//             path: "/dashboard/parent-category",
//             element: (
//               <AdminRoute>
//                 <ParentCategory></ParentCategory>
//               </AdminRoute>
//             ),
//           },
//           {
//             path: "/dashboard/sub-category",
//             element: (
//               <AdminRoute>
//                 <SubCategory></SubCategory>
//               </AdminRoute>
//             ),
//           },
//           {
//             path: "/dashboard/add-product",
//             element: (
//               <AdminRoute>
//                 <AddProduct></AddProduct>
//               </AdminRoute>
//             ),
//           },
//           {
//             path: "/dashboard/pending-order",
//             element: (
//               <AdminRoute>
//                 <PendingOrder></PendingOrder>
//               </AdminRoute>
//             ),
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <ErrorPage></ErrorPage>,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <ClickToComponent />
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// );

import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClickToComponent } from "click-to-react-component";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
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

// ------------------
// Utility: fetch with timeout & error handling
// ------------------
const fetchWithTimeout = async (url, options = {}, timeout = 7000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout),
    ),
  ])
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null; // So route still renders even if API fails
    });
};

// ------------------
// Loader Wrappers
// ------------------
const homeLoader = async () => {
  const products = await fetchWithTimeout(
    "https://api-penguin.onrender.com/api/penguin/get-product-list",
  );
  return { products };
};

const productsLoader = async () => {
  const [products, categories] = await Promise.all([
    fetchWithTimeout(
      "https://api-penguin.onrender.com/api/penguin/get-product-list",
    ),
    fetchWithTimeout(
      "https://api-penguin.onrender.com/api/client/get-all-categories",
    ),
  ]);
  return { products, categories };
};

const productDetailsLoader = async ({ params }) => {
  const [products, product_details, comments] = await Promise.all([
    fetchWithTimeout(
      "https://api-penguin.onrender.com/api/penguin/get-product-list",
    ),
    fetchWithTimeout(
      `https://api-penguin.onrender.com/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
    ),
    fetchWithTimeout(
      `https://api-penguin.onrender.com/api/penguin/get-review-list/${params.prod_id}`,
    ),
  ]);
  return { products, product_details, comments };
};

// ------------------
// Router Definition
// ------------------
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: "home", element: <Home />, loader: homeLoader },
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
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "/dashboard/make-admin", element: <MakeAdmin /> },
          { path: "/dashboard/parent-category", element: <ParentCategory /> },
          { path: "/dashboard/sub-category", element: <SubCategory /> },
          { path: "/dashboard/add-product", element: <AddProduct /> },
          { path: "/dashboard/pending-order", element: <PendingOrder /> },
        ],
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

// ------------------
// Render App
// ------------------
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ClickToComponent />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
