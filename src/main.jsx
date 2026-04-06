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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "home",
        Component: Home,
        loader: async () =>
          await fetch("http://localhost:5000/api/penguin/get-product-list"),
      },
      {
        path: "products",
        Component: Products,
        loader: async () => {
          const products = await fetch(
            "http://localhost:5000/api/penguin/get-product-list",
          );
          const categories = await fetch(
            "http://localhost:5000/api/client/get-all-categories",
          );
          return {
            products: await products.json(),
            categories: await categories.json(),
          };
        },
      },
      {
        path: "product-details/:id/:prod_id",
        Component: ProductDetails,
        loader: async ({ params }) => {
          const products = await fetch(
            "http://localhost:5000/api/penguin/get-product-list",
          );
          const details = await fetch(
            `http://localhost:5000/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
          );
          return {
            products: await products.json(),
            product_details: await details.json(),
          };
        },
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "checkout",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "about",
        Component: AboutUs,
      },
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
        children: [
          { index: true, element: <DashboardHome></DashboardHome> },
          {
            path: "/dashboard/make-admin",
            Component: MakeAdmin,
          },
          {
            path: "/dashboard/parent-category",
            Component: ParentCategory,
          },
          {
            path: "/dashboard/sub-category",
            Component: SubCategory,
          },
          {
            path: "/dashboard/add-product",
            Component: AddProduct,
          },
          {
            path: "/dashboard/pending-order",
            Component: PendingOrder,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <ClickToComponent />
      <RouterProvider router={router} />
    </Provider>
  </>,
);
