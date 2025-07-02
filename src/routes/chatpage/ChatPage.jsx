import React from "react";

const ChatPage = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-6">
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
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
