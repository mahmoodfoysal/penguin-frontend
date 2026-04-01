import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClickToComponent } from "click-to-react-component";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./modules/client/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClickToComponent />
    <RouterProvider router={router} />
  </StrictMode>,
);
