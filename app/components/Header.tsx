import React from "react";
import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md 2xl:py-4 lg:py-3 py-2.5 2xl:px-6 lg:px-5 px-4 flex items-center justify-between">
      <div className="flex items-center 2xl:gap-3 lg:gap-2.5 gap-2">
        <Image
          src={"/nikola.png"}
          alt=""
          width={32}
          height={32}
          className="2xl:w-[36px] 2xl:h-[36px] lg:w-[32px] lg:h-[32px] w-[28px] h-[28px] rounded-full"
        />
        <h1 className="2xl:text-3xl lg:text-2xl text-xl font-semibold tracking-tight">
          Crypto Dashboard
        </h1>
      </div>
      <div className="flex space-x-4">
        <button className="bg-gray-700 hover:bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75">
          Mode
        </button>
      </div>
    </header>
  );
}
