import React from "react";
import { Outlet } from "react-router-dom";

const DashBoardLayout = () => {
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
