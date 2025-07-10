import React from "react";
import { Link } from "react-router-dom";
import orbital from "/orbital.png";
import "./homepage.css";
import bot from "/bot.png";

const HomePage = () => {
  return (
    <div className="flex items-center justify-between gap-20 bg-transparent h-full p-4 ">
      <img
        src={orbital}
        alt="background-image"
        className="absolute bottom-0 left-0 opacity-20 orbital -z-10 "
      />
      <div className="flex flex-col items-center justify-center text-center p-4 flex-1/2 gap-4">
        <h1 className="text-9xl bg-linear-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent">
          R2 AI
        </h1>
        <h2 className="text-2xl font-bold">
          A friendly chatbot that helps you
        </h2>
        <h3 className="text-1xl max-w-[75%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus ea
          quisquam ipsa blanditiis provident tenetur tempora neque nesciunt?
          Magnam ex mollitia autem quam esse earum eligendi corrupti possimus
          odio sequi?
        </h3>
        <Link
          to="/dashboard"
          className="rounded-md bg-[rebeccapurple] p-2 text-white no-underline hover:bg-purple-700 transition-colors"
        >
          Get started
        </Link>
      </div>
      <div className="flex-1/2 flex items-center justify-center h-[100%]">
        <div className="flex items-center justify-center w-[80%] h-[60%] rounded-lg p-4">
          <img
            src={bot}
            alt="bot-img"
            className="object-contain animate-[bounce_2s_infinite] "
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
