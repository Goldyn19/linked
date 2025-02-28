import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Option {
    id?: number;
    shortenUrl: string;
    description: string;
    icon: string;
    color: string;
    url: string;
}

interface LinkFormProps {
  id: number;
  description: string;
  url: string;
  shortenUrl: string;
  user_id: string | undefined;
  updateLink: (id: number, option: Option, url: string) => void;
  removeLink: (id: number) => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ id, description, url, shortenUrl, updateLink, removeLink, user_id }) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [shortUrl, setShortUrl] = useState(shortenUrl);
  const [inputDescription, setInputDescription] = useState(description);
  const [urlError, setUrlError] = useState("");

  const [buttonText, setButtonText] = useState("Copy");

  const copyText = async () => {
    if (!shortUrl) {
      setButtonText("No URL");
      setTimeout(() => setButtonText("Copy"), 2000);
      return;
    }
  
    try {
      await navigator.clipboard.writeText(`localhost:3000/${user_id}/${shortUrl}`);
      setButtonText("Copied!");
      setTimeout(() => setButtonText("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      setButtonText("Failed");
      setTimeout(() => setButtonText("Copy"), 2000);
    }
  }

  useEffect(() => {
    setInputUrl(url);
    setInputDescription(description);
    setShortUrl(shortenUrl);
  }, [url, description, shortenUrl]);

  useEffect(() => {
    if (inputUrl.trim() !== "") {
      updateLink(id, { shortenUrl: shortUrl, icon: "/images/link.svg", color: "#1A1A1A", description:inputDescription, url: inputUrl }, inputUrl);
    }
  }, [inputUrl, shortUrl, inputDescription]);

  return (
    <div className="w-full bg-light-grey my-5 p-5 rounded-lg">
      <div className="flex justify-between">
        <h1 className="flex items-center">
          <Image src="/images/doubleLine.svg" alt="logo" height={6} width={12} />
          <span className="text-heading-s text-light-black ml-2">Link #{id}</span>
        </h1>
        <h1 className="text-body-m text-light-black cursor-pointer" onClick={() => removeLink(id)}>
          Remove
        </h1>
      </div>

      {/* URL Input */}
      <label htmlFor={`link-input-${id}`} className="block text-body-s mb-[-10px]">
        Link
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src="/images/link.svg" alt="favicon" height={16} width={17} />
        </div>
        <input
          type="text"
          id={`link-input-${id}`}
          className={`rounded-lg block w-full pl-10 border text-body-m ${urlError ? "border-red-500 placeholder-red-500" : "border-dark-grey"}`}
          placeholder="e.g. https://www.example.com"
          value={inputUrl}
          onChange={(e) => {
            setInputUrl(e.target.value);
            setUrlError(e.target.value.trim() === "" ? "Please enter a valid URL" : "");
          }}
          required
        />
      </div>

      {/* Shorten Link Input */}
      <label htmlFor={`short-url-${id}`} className="block text-body-s mt-4">
        Shorten Link
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src="/images/link.svg" alt="link icon" height={16} width={17} />
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <span className="text-custom-blue" onClick={copyText}>{buttonText}</span>
        </div>
        <input
          type="text"
          id={`short-url-${id}`}
          className="rounded-lg block w-full pl-10 border text-body-m border-dark-grey"
          placeholder="Enter a customized short link"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
          required
        />
      </div>

      {/* Description Input */}
      <label htmlFor={`description-${id}`} className="block text-body-s mt-4">
        Description
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image src="/images/link.svg" alt="description icon" height={16} width={17} />
        </div>
        <input
          type="text"
          id={`description-${id}`}
          className="rounded-lg block w-full pl-10 border text-body-m border-dark-grey"
          placeholder="Enter a description"
          value={inputDescription}
          onChange={(e) => setInputDescription(e.target.value)}
          required
        />
      </div>

      {urlError && <p className="text-red-500 text-xs mt-1">{urlError}</p>}
    </div>
  );
};

export default LinkForm;
