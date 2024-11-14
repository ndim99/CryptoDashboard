import React, { useState } from "react";
import Image from "next/image";
import ChevronDown from "./Icons/ChevronDown";
import ChevronUp from "./Icons/ChevronUp";

interface ChainSelectorProps {
  chain: string;
  setChain: React.Dispatch<React.SetStateAction<string>>;
}

export default function ChainSelector({ chain, setChain }: ChainSelectorProps) {
  const [dropdown, setDropdown] = useState(false);

  const handleChainChange = (newChain: string) => {
    setChain(newChain);
    setDropdown(false);
  };

  return (
    <div className="relative w-max">
      <div
        className="w-full flex justify-between items-center gap-2 bg-gray-800 text-white 2xl:py-2 py-1.5 2xl:px-4 lg:px-3 px-2 rounded-md cursor-pointer border border-gray-600 hover:bg-gray-700 transition-colors h-[42px]"
        onClick={() => setDropdown(!dropdown)}
      >
        <div className="flex items-center gap-2">
          <Image
            src={`/${chain}-logo.svg`}
            width={28}
            height={28}
            alt={`${chain} logo`}
            className="rounded-full"
          />
          <p className="capitalize">{chain} (Chain)</p>
        </div>

        <div className="transform duration-150">
          {!dropdown ? (
            <ChevronDown className="transform duration-150 w-4 h-4" />
          ) : (
            <ChevronUp className="transform duration-150 w-4 h-4" />
          )}
        </div>
      </div>

      {dropdown && (
        <div className="absolute left-0 mt-2 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
          <div className="flex flex-col">
            <div
              className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-700 transition-colors h-[42px]"
              onClick={() => handleChainChange("ethereum")}
            >
              <Image
                src="/ethereum-logo.svg"
                width={28}
                height={28}
                alt="Ethereum logo"
                className="rounded-full"
              />
              <p>Ethereum</p>
            </div>
            <div
              className="flex items-center gap-2 py-2 px-4 cursor-pointer hover:bg-gray-700 transition-colors h-[42px]"
              onClick={() => handleChainChange("solana")}
            >
              <Image
                src="/solana-logo.svg"
                width={28}
                height={28}
                alt="Solana logo"
                className="rounded-full"
              />
              <p>Solana</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
