import React, { useState, useRef } from "react";
import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import attachment from "/attachment.png";

const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");
    if (!response.ok) {
      throw new Error(
        "Request failed with " + response.status + " : " + response.statusText
      );
    }

    const data = await response.json();
    const { token, expire, signature } = data;
    return { token, expire, signature };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication failed");
  }
};

const Upload = ({ setUploadedImage }) => {
  const uploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error:", err);
    setUploadedImage((prev) => ({
      ...prev,
      error: err.message || "An error occurred during upload",
      url: "",
      isLoading: false,
    }));
  };

  const onSuccess = (res) => {
    console.log("Success:", res);
    setUploadedImage((prev) => ({
      ...prev,
      url: res.url,
      isLoading: false,
      error: null,
    }));
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <div>
        <IKUpload
          fileName="upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          ref={uploadRef}
          style={{ display: "none" }}
        />
        <label
          className="flex items-center justify-center"
          onClick={() => uploadRef.current?.click()}
        >
          <img
            src={attachment}
            alt="add file"
            className="w-7 hover:bg-gray-600 cursor-pointer rounded-3xl p-1"
          />
        </label>
      </div>
    </IKContext>
  );
};

export default Upload;
