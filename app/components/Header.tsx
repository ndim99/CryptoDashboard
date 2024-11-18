import React from "react";
import Image from "next/image";
import ThemeButton from "./ThemeButton";
export default function Header() {
  return (
    <header className="bg-gray-200 dark:bg-gray-200 dark:bg-gray-800 text-black dark:text-black dark:text-white shadow-md 2xl:py-4 lg:py-3 py-2.5 2xl:px-5 lg:px-4 px-3 flex items-center justify-between border-b border-gray-300 dark:border-gray-600">
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
        <ThemeButton />
      </div>
    </header>
  );
}
