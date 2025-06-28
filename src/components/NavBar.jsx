import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "/logo.png";
import { UserButton, SignedIn } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <div className="pt-4 pb-4 px-4 h-screen flex flex-col mb-1">
      <header className="flex items-center justify-between border-b border-gray-700 p-0.5 pb-3 ">
        <nav>
          <Link to="/" className="flex items-center gap-2 text-1xl font-bold">
            <img src={logo} alt="Logo" className="w-5 h-5" />
            <span>Lama AI</span>
          </Link>
        </nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
