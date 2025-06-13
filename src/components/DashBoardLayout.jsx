import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const DashBoardLayout = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [userId, isLoaded]);
  return (
    <div>
      <div>Menu</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
