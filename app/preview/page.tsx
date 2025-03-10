"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  type Link = {
    id: number;
    shortenUrl: string;
    description: string;
    icon: string;
    color: string;
    url: string;
  };

  const { data: session } = useSession();
  const [links, setLinks] = useState<Link[]>([]);

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

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      ...Array(Math.max(0, links.length)).fill({
        id: -1,
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
    <div className="relative m-0 flex flex-col justify-center items-center align-middle min-h-screen">
      <div className="absolute top-0  md:h-[357px] h-full md:bg-custom-blue w-full rounded-b-[32px]">
        <nav className="relative flex bg-white justify-between m-8 p-6  z-20 rounded-lg">
          <Link href="/links">
            <button className="bg-white text-heading-s px-4 text-custom-blue rounded-[8px] border border-custom-blue">
              Back to Editor
            </button>
          </Link>
          <button className="bg-custom-blue text-white text-heading-s rounded-[8px] px-4">
            Share Link
          </button>
        </nav>
      </div>
      <div className="flex flex-col w-[350px] bg-white z-10 md:h-[570px] h-full md:shadow-2xl rounded-[24px] items-center p-10 md:mb-24 xl:mb-0 space-y-2">
        <div className="rounded-full h-[105px] w-[105px] border border-custom-blue">
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
        <div className={` text-heading-m bg-[#EEEEEE] h-[48px] ${firstName || lastName ? "bg-white text-custom-black" : "bg-[#EEEEEE]"}`}>
          {firstName} {lastName}
        </div>
        <div className={`text-body-m text-light-black bg-[#EEEEEE] min-h-[8px] max-h-[40px] text-center ${email ? "bg-white text-light-black" : "bg-[#EEEEEE]"}`}>
          {email}
        </div>
        <div className="overflow-scroll scrollbar-hide space-y-2">
          {renderLinks()}
        </div>
      </div>
    </div>
  );
};

export default Page;
