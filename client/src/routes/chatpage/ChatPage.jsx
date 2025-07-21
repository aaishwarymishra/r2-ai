import React, { useEffect } from "react";
import { useRef, useState } from "react";
import Input from "../../components/Input";
import MarkDown from "react-markdown";
import "./ChatPage.css"; 

const ChatPage = () => {
  const [userInput, setUserInput] = useState("");
  const [modelResponse, setModelResponse] = useState("");
  const scrollToBottomDiv = useRef(null);
  useEffect(() => {
    if (scrollToBottomDiv.current) {
      scrollToBottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [userInput, modelResponse]);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden p-0.5">
      <div className="flex-1 overflow-y-auto p-6 min-h-0">
        <div className="flex flex-col gap-4 max-w-[75%] mx-auto text-white">
          <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
            Hi
          </div>
          <div className="from-bot max-w-[80%] p-2.5 rounded-2xl bg-gray-800 self-start">
            Hello! How can I assist you today?
          </div>
          <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
            Can you help me with a React component?
          </div>
          <div className="from-bot max-w-[80%] p-2.5 rounded-2xl bg-gray-800 self-start">
            Of course! I'd be happy to help you with React components. What
            specific aspect would you like assistance with?
          </div>
          <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
            How do I handle state in functional components?
          </div>
          <div className="from-bot max-w-[80%] p-2.5 rounded-2xl bg-gray-800 self-start">
            You can use the useState hook for managing state in functional
            components. Here's a simple example: const [count, setCount] =
            useState(0);
          </div>
          <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
            That's helpful, thank you!
          </div>
          <div className="from-bot max-w-[80%] p-2.5 rounded-2xl bg-gray-800 self-start">
            You're welcome! Feel free to ask if you have any more questions
            about React or anything else.
          </div>
          <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
            I will. Thanks again!
          </div>
          {userInput && (
            <div className="from-user max-w-[50%] p-2.5 rounded-2xl bg-gray-800 self-end">
              {userInput}
            </div>
          )}
          {modelResponse && (
            <div className="from-bot max-w-[80%] p-2.5 rounded-2xl bg-gray-800 self-start">
              <MarkDown>{modelResponse}</MarkDown>
            </div>
          )}
          <div ref={scrollToBottomDiv}></div>
        </div>
      </div>
      <Input
        setModelResponse={setModelResponse}
        setUserInput={setUserInput}
      ></Input>
    </div>
  );
};

export default ChatPage;
