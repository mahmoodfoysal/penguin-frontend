import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClickToComponent } from "click-to-react-component";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./modules/client/Home/Home/Home";
import Products from "./modules/client/Products/Products.jsx";
import ProductDetails from "./modules/client/ProductDetrails/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      {
        path: "products",
        Component: Products,
        loader: async () =>
          await fetch("http://localhost:5000/api/penguin/get-product-list"),
      },
      {
        path: "product/:id/:prod_id",
        Component: ProductDetails,
        loader: async ({ params }) =>
          await fetch(
            `http://localhost:5000/api/penguin/get-product-list/${params.id}/${params.prod_id}`,
          ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClickToComponent />
    <RouterProvider router={router} />
  </StrictMode>,
);
