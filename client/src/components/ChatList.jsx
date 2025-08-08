import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const ChatList = () => {
  let location = useLocation();
  const { userId, isLoaded } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!isLoaded || !userId) return;
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/chats/${userId}`
        );
        if (response.ok) {
          let data = await response.json();
          data = JSON.parse(data);
          console.log("Fetched chats:", data);
          setChats(data.chats || []);
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, [location, isLoaded]);
  return (
    <div className="flex flex-col gap-2.5 h-[100%] p-3 ">
      <Link
        to="/dashboard"
        className="text-[16px] hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
      >
        New Chat
      </Link>
      <span className="font-bold text-[14px] p-1">Recent Chats</span>
      <hr className="text-gray-500" />
      <div className="flex flex-col  text-[14px]">
        {chats.map((chat) => (
          <Link
            key={chat.chat_id["$oid"]}
            to={`/dashboard/chats/${chat.chat_id["$oid"]}`}
            className="hover:text-blue-500 transition-colors hover:bg-gray-600 p-1 rounded"
          >
            {chat.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
