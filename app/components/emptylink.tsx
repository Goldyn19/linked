import React from "react";
import Image from "next/image";
const Emptylink = () => {
  return (
    <div className="flex flex-col mx-auto justify-center align-middle items-center bg-light-grey    ">
      <Image
        src="/images/emptylink.svg"
        alt="logo"
        className=" h-auto w-auto pt-8"
        height={161}
        width={250}
      />
      <h1 className="text-heading-m my-5">Let’s get you started</h1>
      <h1 className="text-body-m text-light-black w-[500px] text-center text leading-tight my-5">Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</h1>
    </div>
  );
};

export default Emptylink;
