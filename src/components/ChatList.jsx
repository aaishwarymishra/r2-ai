import React from "react";
import { Link } from "react-router-dom";

const ChatList = () => {
  return (
    <div className="flex flex-col gap-2.5 h-[100%] p-2.5 ">
      <Link
        to="/dashboard"
        className="text-[16px] hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
      >
        New Chat
      </Link>
      <span className="font-bold text-[14px] p-1">Recent Chats</span>
      <hr className="text-gray-500" />
      <div className="flex flex-col  text-[14px]">
        <Link
          to="/dashboard/chats/1"
          className="hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
        >
          Chat 1
        </Link>
        <Link
          to="/dashboard/chats/2"
          className="hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
        >
          Chat 2
        </Link>
        <Link
          to="/dashboard/chats/3"
          className="hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
        >
          Chat 3
        </Link>
        <Link
          to="/dashboard/chats/4"
          className="hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
        >
          Chat 4
        </Link>
      </div>
    </div>
  );
};

export default ChatList;
