import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";
import "./styles/main.css";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "category/:topic", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "books/:id", element: <BookDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
