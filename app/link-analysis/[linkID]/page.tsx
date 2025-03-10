'use client'
import React from "react";
import Navbar from "@/app/components/NavBar";
// import { QRCodeCanvas } from "qrcode.react";
// import PieChart from "@/app/components/PieChart";
import ComingSoon from "@/app/components/ComingSoon";
const page = () => {
  // const url = "bitly.com/3k4j5l6";
  return (
    <div className="h-screen">
      <Navbar />
      <section className="flex justify-center items-center w-full">
        {/* <div className="bg-transparent w-[500px]">
          <div className="space-y-4">
            <h1 className="justify-center flex items-center">
              <span className="mr-2">Shorten URL:</span>
              {url}
            </h1>
            <div className="flex flex-col items-center gap-4">
              <QRCodeCanvas value={url} size={200} />
              <p>Scan the QR code to visit the website</p>
            </div>
          </div>
          <div></div>
        </div>
        <div className="bg-white w-[500px]">
          <PieChart />
        </div> */}
        <ComingSoon/>
      </section>
    </div>
  );
};

export default page;
