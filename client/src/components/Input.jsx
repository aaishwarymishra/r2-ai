import React, { useState } from "react";
import { IKImage } from "imagekitio-react";
import arrow from "/arrow.png";
import Upload from "./Upload";

const Input = ({ setUserInput, setModelResponse }) => {
  async function handleInputChange(e) {
    e.preventDefault();
    const text = e.target.input.value;
    if (!text) {
      return;
    }
    setUserInput(text);
    try {
      const url = new URL("http://localhost:3000/api/generate-text");
      url.searchParams.append("prompt", text);
      if (uploadedImage.url) {
        url.searchParams.append("imageUrl", uploadedImage.url);
      }
      setUploadedImage((prev) => {
        return { ...prev, url: "" };
      });
      const response = await fetch(url.toString(), {
        method: "POST",
      });
      if (!response.status === 200) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setModelResponse(data.text);
    } catch (error) {
      console.error("Error fetching data:", error);
      setModelResponse("An error occurred while fetching the response.");
    }
  }
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
