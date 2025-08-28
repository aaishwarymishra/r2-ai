import React, { useEffect, useState } from "react";
import { IKImage } from "imagekitio-react";
import arrow from "/arrow.png";
import Upload from "./Upload";

const Input = ({ setChatData, setModelResponse, chatId, chatData }) => {
  async function handleInputChange(e) {
    e.preventDefault();
    const text = e.target.input.value;
    e.target.reset();
    if (!text) {
      return;
    }
    let input = { role: "user", parts: [{ text }] };
    try {
      const url = new URL(
        import.meta.env.VITE_BACKEND_URL + "/api/generate-text"
      );
      url.searchParams.append("prompt", text);
      if (uploadedImage.url) {
        url.searchParams.append("imageUrl", uploadedImage.url);
        input.parts.push({ img: uploadedImage.url });
      }
      if (chatId) {
        url.searchParams.append("chatId", chatId);
      }

      setChatData((prev) => [...prev, input]);
      setModelResponse("Loading...");

      setUploadedImage((prev) => {
        return { ...prev, url: "" };
      });
      const response = await fetch(url.toString(), {
        method: "POST",
      });
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      let result = "";
      setModelResponse("");
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
        setModelResponse(result);
      }
      setModelResponse("");
      setChatData((prev) => [
        ...prev,
        { role: "model", parts: [{ text: result }] },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      setModelResponse("An error occurred while fetching the response.");
    }
  }

  useEffect(() => {
    async function handleIntialQuery() {
      try {
        if (chatData.length === 1) {
          const initialQuery = chatData[0].parts[0].text;
          let input = { role: "user", parts: [{ text: initialQuery }] };
          if (chatData[0].parts[1]?.img) {
            input.parts.push({ img: chatData[0].parts[1].img });
          }
          setModelResponse("Loading...");
          setChatData([input]);
          const url = new URL(
            import.meta.env.VITE_BACKEND_URL + "/api/generate-text"
          );
          url.searchParams.append("prompt", initialQuery);
          if (chatData[0].parts[1]?.img) {
            url.searchParams.append("imageUrl", chatData[0].parts[1].img);
          }
          if (chatId) {
            url.searchParams.append("chatId", chatId);
          }
          const response = await fetch(url.toString(), {
            method: "POST",
          });
          if (response.status !== 200) {
            throw new Error("Network response was not ok");
          }

          let result = "";
          setModelResponse("");
          const reader = response.body.getReader();
          const decoder = new TextDecoder("utf-8");
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            setModelResponse(result);
          }
          setModelResponse("");
          setChatData((prev) => [
            ...prev,
            { role: "model", parts: [{ text: result }] },
          ]);
        }
      } catch (error) {
        console.error("Error updating chat data:", error);
      }
    }
    handleIntialQuery();
  }, []);

  const [uploadedImage, setUploadedImage] = useState({
    url: "",
    isLoading: false,
    error: "",
  });
  return (
    <div className="flex flex-col justify-center w-full gap-2 mb-5  bg-transparent">
      <div className="w-[75%] mx-auto">
        {uploadedImage.url && !uploadedImage.isLoading && (
          <IKImage
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            src={uploadedImage.url}
            width="150"
            height="150"
            alt="Uploaded image"
            className="rounded-lg"
          />
        )}
        {uploadedImage.isLoading && (
          <div className="flex items-center justify-center">
            <p className="text-white">Uploading...</p>
          </div>
        )}
        {uploadedImage.error && (
          <div className="flex items-center justify-center">
            <p className="text-red-500">{uploadedImage.error}</p>
          </div>
        )}
      </div>
      <form
        className="flex items-center gap-2 p-2 bg-gray-800 rounded-2xl shadow-lg w-[75%] mx-auto"
        onSubmit={handleInputChange}
      >
        <Upload setUploadedImage={setUploadedImage} />
        <input
          type="text"
          placeholder="Ask anything"
          name="input"
          className="flex-1 justify-center bg-transparent text-white outline-none"
        />
        <button className="flex items-center justify-center" type="submit">
          <img
            src={arrow}
            alt="send"
            className="w-7 hover:bg-gray-600 cursor-pointer rounded-3xl p-1"
          />
        </button>
      </form>
    </div>
  );
};

export default Input;
