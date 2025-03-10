import React from 'react'
import Image from "next/image";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    weight: ["400", "700"],
    subsets: ["latin"],
  });

const ComingSoon = () => {
  return (
    <div className="h-full max-w-screen-lg md:mt-10 mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="mb-6 md:mb-0 md:mr-6">
          <Image
            src={`/images/coming-soon.png`}
            alt="Coming Soon"
            width={500}
            height={150}
            className="w-full max-w-xs md:max-w-none"
          />
        </div>

        {/* Text Section */}
        <div className="flex items-center">
          <div className="text-center md:text-left">
            <h1
              className={`text-nhBlue-600 text-3xl md:text-5xl font-bold tracking-wide ${poppins.className}`}
            >
              Coming Soon!
            </h1>
            <h6
              className={`text-nhBlue-200 text-[6px] md:text-2xl mt-4  ${poppins.className}`}
            >
              We are currently working on this section.
            </h6>
         
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
