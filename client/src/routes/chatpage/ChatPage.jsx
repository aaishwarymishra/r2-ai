import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";
import MarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChatPage.css";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const [modelResponse, setModelResponse] = useState("");
  // State to hold chat data
  const [chatData, setChatData] = useState([]);
  // Reference to the div to scroll to the bottom
  const scrollToBottomDiv = useRef(null);
  // Get path Id for the chat
  const { id } = useParams();
  useEffect(() => {
    // Fetch chat data based on the id from the URL
    const fetchChatData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/chat/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        // The backend returns a JSON string; parse if needed
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch {}
        }
        setChatData(data.history || []);
      } catch (error) {
        console.error("Error fetching chat data:", error);
      }
    };

    fetchChatData();
  }, [id]);
  // Scroll to the bottom when userInput or modelResponse changes
  useEffect(() => {
    if (scrollToBottomDiv.current) {
      scrollToBottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatData, modelResponse]);

  function displayChatMessages(messages) {
    const chatClasses = {
      user: "from-user max-w-[70%] p-2.5 rounded-2xl bg-gray-800 self-end",
      model: "from-bot max-w-[100%] p-2.5 rounded-2xl bg-gray-800 self-start",
    };
    return messages.map((message, index) => {
      return (
        <React.Fragment key={index}>
          {message.parts?.[1]?.img && (
            <IKImage
              urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
              src={message.parts[1].img}
              width="150"
              height="150"
              alt="Uploaded image"
              className="rounded-lg mb-2 self-end"
            />
          )}
          <div className={chatClasses[message.role]}>
            {message.role === "model" ? (
              <MarkDown remarkPlugins={[remarkGfm]}>
                {message.parts?.[0]?.text || ""}
              </MarkDown>
            ) : (
              message.parts?.[0]?.text || ""
            )}
          </div>
        </React.Fragment>
      );
    });
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-0.5">
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="flex flex-col gap-4 max-w-[75%] mx-auto text-white text-[1rem]">
          {displayChatMessages(chatData || [])}
          <div ref={scrollToBottomDiv} />
          {modelResponse && (
            <div
              className={
                "from-bot max-w-[100%] p-2.5 rounded-2xl bg-gray-800 self-start"
              }
            >
              <MarkDown remarkPlugins={[remarkGfm]}>{modelResponse}</MarkDown>
            </div>
          )}
        </div>
      </div>
      <Input
        setModelResponse={setModelResponse}
        setChatData={setChatData}
        chatId={id}
      ></Input>
    </div>
  );
};

export default ChatPage;
