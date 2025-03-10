"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <div className="w-full top-0 bg-white my-3 overflow-x-hidden">
      <div className="max-w-[1800px] flex items-center justify-between md:mx-auto py-2 md:px-10 px-5 ">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/">
        <div className="cursor-pointer flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="mt-2 h-auto w-auto"
            height={34}
            width={34}
          />
          <h1 className="text-heading-m pl-2 pt-2 hidden md:block">devlinks</h1>
        </div>
        </a>
        <div className="flex ">
          <Link  href="/links">
          <div
            className={`cursor-pointer flex items-center justify-center px-6 rounded-lg ${
              currentPath === "/links" ? "text-custom-blue bg-light-purple" : ""
            }`}
          >
            <Image
              src="/images/link.svg"
              alt="logo"
              className=" h-auto w-auto  md:py-2 py-3"
              height={34}
              width={34}
            />
            <h1
              className={`text-heading-s pl-1 hidden md:block ${
                currentPath === "/links" ? "text-custom-blue" : "text-light-black"
              }`}
            >
              links
            </h1>
          </div>
          </Link>
         <Link  href="/profile">
         <div
            className={`cursor-pointer flex items-center justify-center  px-6 rounded-lg ${
              currentPath === "/profile" ? "text-custom-blue bg-light-purple" : ""
            }`}
          >
            <Image
              src="/images/profile.svg"
              alt="logo"
              className=" h-auto w-auto md:py-2 py-3"
              height={34}
              width={34}
            />
            <h1
              className={`text-heading-s pl-1  hidden md:block ${
                currentPath === "/profile" ? "text-custom-blue  " : "text-light-black"
              }`}
            >
              profile details
            </h1>
          </div>
         </Link>
        </div>
        <Link  href="/preview">
          <button className="border border-custom-blue text-custom-blue text-heading-s px-4 rounded-lg hidden md:block ">
            Preview
          </button>
          <button className="border border-custom-blue text-custom-blue text-heading-s px-4 py-3 rounded-lg block md:hidden ">
          <Image
              src="/images/previewIcon.svg"
              alt="logo"
              className=" h-5 w-5  "
              height={20}
              width={20}
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
