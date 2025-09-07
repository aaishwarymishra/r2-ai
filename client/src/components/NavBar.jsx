import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "/logo.png";
import { UserButton, SignedIn } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="flex items-center justify-between border-b border-gray-700 p-3 ">
        <nav>
          <Link to="/" className="flex items-center gap-2 text-1xl font-bold">
            <img src={logo} alt="Logo" className="w-15" />
            <span>R2 AI</span>
          </Link>
        </nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default NavBar;
