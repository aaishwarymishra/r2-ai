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
import { ClerkProvider } from "@clerk/clerk-react";
import SignUpElement from "./routes/signup-page/SignUpElement.jsx";
import SignInElement from "./routes/signin-page/SignInElement.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error(
    "VITE_PUBLISHABLE_KEY is not defined. Please set it in your environment variables."
  );
}

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
      {
        path: "/sign-up/*",
        element: <SignUpElement />,
      },
      {
        path: "/sign-in/*",
        element: <SignInElement />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
