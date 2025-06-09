import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "/logo.png";

const NavBar = () => {
  return (
    <div className="pt-4 pb-4 px-16 h-screen flex flex-col mb-1">
      <header className="flex items-middle justify-between">
        <nav>
          <Link to="/" className="flex items-center gap-2 text-1xl font-bold">
            <img src={logo} alt="Logo" className="w-5 h-5" />
            <span>Lama AI</span>
          </Link>
        </nav>
        <div>user</div>
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
