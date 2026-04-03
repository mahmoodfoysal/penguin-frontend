import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClickToComponent } from "click-to-react-component";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./modules/client/Home/Home/Home";
import Products from "./modules/client/Products/Products.jsx";
import ProductDetails from "./modules/client/ProductDetrails/ProductDetails.jsx";
import Cart from "./modules/client/Cart/Cart.jsx";
import Checkout from "./modules/client/Checkout/Checkout.jsx";
import Login from "./modules/Authentication/Login/Login.jsx";

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
        path: "product/:id/:prod_id",
        Component: ProductDetails,
        loader: async ({ params }) =>
          await fetch(
            `http://localhost:5000/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
          ),
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <ClickToComponent />
    <RouterProvider router={router} />
  </>,
);
