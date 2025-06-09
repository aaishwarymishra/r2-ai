import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homepage/HomePage.jsx";
import DashBoard from "./routes/dashboard/DashBoard.jsx";
import ChatPage from "./routes/chatpage/ChatPage.jsx";
import NavBar from "./components/NavBar.jsx";
import DashBoardLayout from "./components/DashBoardLayout.jsx";

const router = createBrowserRouter([
  {
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        element: <DashBoardLayout />,
        children: [
          { path: "/dashboard/chats/:id", element: <ChatPage /> },
          { path: "/dashboard", element: <DashBoard /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
