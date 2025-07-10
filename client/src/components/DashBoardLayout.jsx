import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ChatList from "./ChatList";

const DashBoardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded]);
  return (
    <div className="flex h-full w-full gap-2.5">
      <div className="flex-1/6 h-full border-r border-gray-500">
        <ChatList />
      </div>
      <div className="flex-5/6 h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
