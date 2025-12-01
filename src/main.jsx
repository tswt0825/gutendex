import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      // her kan vi også legge til en egen 404-side senere med errorElement
      children: [
        { path: "/", element: <Home /> },
        { path: "/category/:topic", element: <Category /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/books/:id", element: <BookDetails /> },
      ],
    },
  ],
  {
    basename: "/gutendex", // ⬅️ VIKTIG for GitHub Pages
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
