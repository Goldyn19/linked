"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import Navbar from "../components/NavBar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { uploadImageToCloudinary } from "../utils/cloudinary";

type Link = {
  id: number;
  shortenUrl: string;
  description: string;
  icon: string;
  color: string;
  url: string;
};

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
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState(session?.user.first_name||"");
  const [lastName, setLastName] = useState(session?.user.last_name||"");
  const [email, setEmail] = useState(session?.user.email || '');
  const [profilePicture, setProfilePicture] = useState(session?.user.profile_picture || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cloudImage, setCloudImage] = useState<string>("");
  
//   console.log(session);

useEffect(() => {
    if (session?.user) {
      setFirstName(session.user.first_name || "");
      setLastName(session.user.last_name || "");
      setEmail(session.user.email || "");
      setProfilePicture(session.user.profile_picture || "");
    }
  }, [session]);
//   console.log(profilePicture)

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const image = files[0];
      try {
        console.log("Uploading image...");
        const imageUrl = await uploadImageToCloudinary(image);
        console.log("Image uploaded successfully!");

        // Update formData with the Cloudinary URL
        setCloudImage(imageUrl);
      } catch {
        // Handle image upload failure
        console.log("Image upload failed. Please try again.");
      }
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("profile_picture", cloudImage);
    
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update-user`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission error.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  // const fetchUserData = async (accessToken: string) => {
  //   try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/auth/users`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
    
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
    
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching and mapping links:", error);
  //       return [];
  //     }
  // }

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    // Fetch and set links when the component mounts
    const loadLinks = async () => {
      if (session?.accessToken) {
        const fetchedLinks = await fetchAndMapLinks(session.accessToken);
        // const userData = await fetchUserData(session.accessToken);
        // console.log(userData);
        setLinks(fetchedLinks);
      }
    };

    loadLinks();
  }, [session]);

  const renderLinks = () => {
    const filledLinks = [
      ...links,
      ...Array(Math.max(0, 5 - links.length)).fill({
        id: -1,
        value: "",
        icon: "",
        color: "#E5E5E5",
      }),
    ];

    return filledLinks.map((link, index) => (
      <div
        key={index}
        className={`bg-[#EEEEEE] rounded-lg h-[45px] w-[240px] z-10 flex items-center justify-between px-2 border border-dark-grey ${
          link.text ? "text-" + link.text : "text-white"
        }`}
        style={{ backgroundColor: link.color }}
      >
        <div className="flex text-body-s">
          {link.icon && (
            <Image
              src={link.icon}
              alt={link.description}
              width={16}
              height={16}
              className=""
            />
          )}
          <span className="ml-2">{link.shortenUrl}</span>
        </div>
        <div>
          <Image
            src="/images/arrowright.svg"
            alt={link.value}
            width={16}
            height={16}
            className=""
          />
        </div>
      </div>
    ));
  };
  

  return (
    <div className="p-0">
      <Navbar />
      <div className="lg:grid lg:grid-cols-5 block h-full mt-3">
        <div className="hidden lg:flex justify-center col-span-2 w-full h-full bg-white mx-auto align-middle items-center relative">
          <Image
            src="/images/mobile-preview.svg"
            alt="logo"
            className="h-auto w-auto"
            height={632}
            width={308}
          />
          <div className="bg-[#EEEEEE] rounded-full h-[100px] min-w-[100px] text-center z-10 flex justify-between absolute top-32">
            {cloudImage  && (
              <Image
                src={cloudImage}
                alt="profile"
                className="h-[100px] w-[100px] rounded-full"
                height={100}
                width={100}
              />
            )}
            {profilePicture && !cloudImage && (
                <Image src={profilePicture} alt="profile" className="h-[100px] w-[100px] rounded-full" height={100} width={100}/>
            )}
          </div>
          <div
            className={`rounded-lg min-h-[16px] max-h-[21px] min-w-[96px] max-w-[280px]  z-10 flex justify-between absolute top-60 text-heading-s 
            ${
              firstName || lastName
                ? "bg-white text-custom-black"
                : "bg-[#EEEEEE]"
            }`}
          >
            {firstName} {lastName}
          </div>
          <div
            className={`rounded-lg min-h-[8px] max-h-[21px] min-w-[72px] max-w-[280px]  z-10 text-center flex justify-between absolute top-64 mt-5 text-body-s 
            ${session?.user.email ? "bg-white text-light-black" : "bg-[#EEEEEE]"}`}
          >
            {session?.user.email}
          </div>
          <div className="p-5 space-y-4 z-10 flex flex-col justify-between absolute bottom-28 h-[300px] overflow-y-scroll scrollbar-hide">
            {renderLinks()}
          </div>
        </div>
        <div className="px-5 bg-white col-span-3 ml-2 pb-24 relative ">
          <h1 className="text-heading-m pt-5">Profile Details</h1>
          <h1 className="text-body-m text-light-black">
            Add your details to create a personal touch to your profile.
          </h1>
          <form action="" className="">
            <div className="mt-5 bg-light-grey px-3 rounded-md ">
              <div className="md:flex  justify-start items-center py-3">
                <h1 className="text-body-m text-light-black w-full md:w-1/4 mx-5">
                  Profile picture
                </h1>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="bg-light-purple flex flex-col items-center px-5 py-8 rounded-md m-5"
                >
                  <Image
                    src="/images/image.svg"
                    alt="logo"
                    className="mt-2 h-auto w-auto"
                    height={40}
                    width={40}
                  />
                  <h1 className="text-heading-s text-custom-blue">
                    +Upload Image
                  </h1>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange} 
                />
                <div className="text-body-s text-light-black w-full md:w-1/4 leading-tight pl-3">
                  <h1>Image must be below 1024x1024px.</h1>
                  <h1> Use PNG or JPG format.</h1>
                </div>
              </div>
            </div>
            <div className="mt-5 bg-light-grey p-5 rounded-md">
              <div className="md:flex block justify-between">
                <label htmlFor="" className=" text-body-m text-light-black">
                  First Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 md:my-2 border border-dark-grey text-body-m  focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="md:flex block justify-between">
                <label htmlFor="" className="text-body-m text-light-black">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 border md:my-2 border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g. Appleseed"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="md:flex block justify-between">
                <label htmlFor="" className=" text-body-m text-light-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email-address-icon"
                  className=" rounded-lg block md:w-[450px] w-full pl-5 md:my-2 border border-dark-grey text-body-m focus:border-custom-blue focus:outline-custom-blue focus:shadow-sm focus:shadow-custom-blue"
                  placeholder="e.g email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <hr className="w-full mt-8 mb-5 border-light-black" />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-custom-blue text-white py-4 rounded-lg px-5 md:absolute w-full md:w-auto  right-5"
            >
              save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
