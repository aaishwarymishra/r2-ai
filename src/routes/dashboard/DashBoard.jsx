import React from "react";
import { Outlet } from "react-router-dom";
import logo from "/logo.png";
import "/chat.png";
import "/image.png";
import "/code.png";
import "/arrow.png";

const DashBoard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 gap-4">
      <div className="flex flex-col items-center justify-center gap-4 text-white p-6 rounded-lg shadow-lg w-[50%]">
        <div className="flex items-center justify-center gap-4 mb-4 ">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <h1 className="text-5xl bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent">
            R2 AI
          </h1>
        </div>
        <div className="flex gap-10 text-lg justify-between text-center">
          <div className="flex-1/3 flex flex-col items-center border border-gray-800 p-4 rounded-lg">
            <img src="chat.png" alt="chat" className="w-15 h-15" />
            <span>Lets chat</span>
          </div>
          <div className="flex-1/3 flex flex-col items-center border border-gray-800 p-4 rounded-lg">
            <img src="image.png" className="w-15 h-15" />
            <span>Analyze image</span>
          </div>
          <div className="flex-1/3 flex flex-col items-center border border-gray-800 p-4 rounded-lg">
            <img src="code.png" alt="code" className="w-15 h-15" />
            <span>Help me code</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center text-white p-1 rounded-lg shadow-lg w-[50%] mt-auto bg-gray-900">
        <form className="flex items-center p-2 justify-between w-full ">
          <input type="text" className="bg-gray-900 flex-4/5 border-0 outline-0" />
          <button>
            <img src="arrow.png" alt="arrow" className="w-7 hover:bg-gray-500 cursor-pointer  rounded-3xl p-0.5 flex-1/5"/>
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashBoard;
