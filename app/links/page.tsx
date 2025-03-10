"use client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import Image from "next/image";
import Emptylink from "../components/emptylink";
import LinkForm from "../components/LinkForm";
type Link = {
  id: number;
  shortenUrl: string;
  description: string;
  icon: string;
  color: string;
  url: string;
  isNew: boolean; // New property to track whether a link is newly created or fetched
  isEdited?: boolean; // Optional flag to track edits on fetched links
};

// type fetchedLinks = {
//   id: number;
//   short_url: string;
//   description: string;
//   original_url: string;
// }

// Function to fetch and map links
const fetchAndMapLinks = async (accessToken: string): Promise<Link[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/link/user-links`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Ensure correct mapping based on API response structure
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((link: any) => ({
      id: link.id,
      shortenUrl: link.short_url, // Ensure key matches API response
      description: link.description,
      icon: "/images/link.svg", // Default icon
      color: "#1A1A1A", // Default color
      url: link.original_url, // Ensure key matches API response
      isNew: false, // Mark as fetched
      isEdited: false, // Initially not edited
    }));
  } catch (error) {
    console.error("Error fetching and mapping links:", error);
    return [];
  }
};

const Page: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const [firstName, setFirstName] = useState(session?.user.first_name || "");
  const [lastName, setLastName] = useState(session?.user.last_name || "");
  const [email, setEmail] = useState(session?.user.email || "");
  const [profilePicture, setProfilePicture] = useState(
    session?.user.profile_picture || ""
  );

  useEffect(() => {
    if (session?.user) {
      setFirstName(session.user.first_name || "");
      setLastName(session.user.last_name || "");
      setEmail(session.user.email || "");
      setProfilePicture(session.user.profile_picture || "");
    }
  }, [session]);

  useEffect(() => {
    // Fetch and set links when the component mounts
    const loadLinks = async () => {
      if (session?.accessToken) {
        const fetchedLinks = await fetchAndMapLinks(session.accessToken);
        setLinks(fetchedLinks);
      }
    };

    loadLinks();
  }, [session]);
  console.log(session?.user.id);

  const addNewLink = () => {
    setLinks([
      ...links,
      {
        id: links.length + 1,
        shortenUrl: "",
        icon: "/images/link.svg",
        color: "#1A1A1A",
        url: "",
        description: "",
        isNew: true,
      },
    ]);
  };

  const updateLink = (
    id: number,
    selectedOption: {
      shortenUrl: string;
      icon: string;
      color: string;
      description: string;
      url: string;
    },
    url: string
  ) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id
          ? { ...link, ...selectedOption, url, isEdited: !link.isNew } // Mark as edited if fetched
          : link
      )
    );
  };

  const removeLink = (id: number) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleSubmit = async () => {
    if (!session) return;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/link`;

    const linksToPost = links.filter((link) => link.isNew); // New links
    const linksToPatch = links.filter((link) => !link.isNew && link.isEdited); // Edited links
    const removedLinks = links.filter(
      (link) => !links.some((l) => l.id === link.id) && !link.isNew
    ); // Removed fetched links

    setError("");

    // Send POST requests for new links
    for (const link of linksToPost) {
      await fetch(`${url}/create-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          original_url: link.url,
          short_url: link.shortenUrl,
          description: link.description,
        }),
      });
    }

    // Send PATCH requests for edited links
    for (const link of linksToPatch) {
      await fetch(`${url}/update-link/${link.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          original_url: link.url,
          short_url: link.shortenUrl,
          description: link.description,
        }),
      });
    }

    // Send DELETE requests for removed links
    for (const link of removedLinks) {
      await fetch(`${url}/delete-link/${link.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    }
  };

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      ...Array(Math.max(0, 5 - links.length)).fill({
        // id: -1,
        value: "",
        icon: "",
        color: "#E5E5E5",
        shortenUrl: "",
        description: "gray-500",
      }),
    ];

    return filledLinks.map((link: Link, index) => (
      <div
        key={index}
        className={`bg-[#EEEEEE] rounded-lg min-h-[45px] w-[240px] z-10 flex items-center justify-between px-2 border border-dark-grey ${
          !link.shortenUrl ? "text-" + link.description : "text-white"
        }`}
        style={{ backgroundColor: link.color }}
      >
        <div className="flex text-body-s">
          {link.icon && (
            <Image
              src={link.icon}
              alt={link.shortenUrl}
              width={16}
              height={16}
              className=""
            />
          )}
          <span className="ml-2">{link.shortenUrl}</span>
        </div>
        <div>
          {link.icon && (
            <Image
              src="/images/arrowright.svg"
              alt={link.shortenUrl}
              width={16}
              height={16}
              className=""
            />
          )}
        </div>
      </div>
    ));
  };

  return (
    <div className="p-0">
      <Navbar />
      <div className="lg:grid lg:grid-cols-5 block h-full mt-3">
        <div className="hidden lg:flex justify-center col-span-2 w-full h-full bg-white mx-auto items-center relative">
          <Image
            src="/images/mobile-preview.svg"
            alt="Mobile Preview"
            className="h-auto w-auto"
            height={632}
            width={308}
          />
          <div className="bg-[#EEEEEE] rounded-full h-[100px] w-[100px] z-10 flex justify-between absolute top-32">
            {profilePicture && (
              <Image
                src={profilePicture}
                alt="profile"
                className="h-[100px] w-[100px] rounded-full"
                height={100}
                width={100}
              />
            )}
          </div>
          <div className="rounded-lg min-h-[16px] max-h-[21px] min-w-[96px] max-w-[280px]  z-10 flex justify-between absolute top-60 text-heading-s ">
            {firstName} {lastName}
          </div>
          <div
            className={`rounded-lg min-h-[8px] max-h-[21px] min-w-[72px] max-w-[280px]  z-10 text-center flex justify-between absolute top-64 mt-5 text-body-s 
            ${email ? "bg-white text-light-black" : "bg-[#EEEEEE]"}`}
          >
            {email}{" "}
          </div>
          <div className="p-5 space-y-4 z-10 flex flex-col justify-between absolute bottom-28 h-[300px] overflow-y-scroll scrollbar-hide">
            {renderLinks()}
          </div>
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative">
          <h1 className="text-heading-m pt-5">Customize your links</h1>
          <p className="text-body-m text-light-black">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <button
            className="text-heading-s text-custom-blue border border-custom-blue w-full rounded-lg mt-8 mb-5 z-10 "
            onClick={addNewLink}
          >
            + Add new link
          </button>
          <div className="lg:h-[400px] overflow-y-scroll scrollbar-hide">
            {links.map((link) => (
              <LinkForm
                key={link.id}
                id={link.id}
                url={link.url}
                updateLink={updateLink}
                removeLink={removeLink}
                description={link.description}
                shortenUrl={link.shortenUrl}
                user_id={session?.user.id}
              />
            ))}
            {links.length === 0 && <Emptylink />}
          </div>

          <hr className="w-full mt-8 mb-5 border-light-black" />
          <p>{error}</p>
          <button
            className={`py-4 rounded-lg px-5 absolute right-5 ${
              links.length > 0 ? "bg-custom-blue" : "bg-light-purple"
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
