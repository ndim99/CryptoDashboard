import ChainSelector from "@/app/components/ChainSelector";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { popularTokens } from "@/lib/data/popularTokens";
import Link from "next/link";
import { TokenData } from "@/types/TokenTypes";

export default function Dashboard() {
  const router = useRouter();
  const [chain, setChain] = useState("ethereum");
  const [tokens, setTokens] = useState<TokenData[]>([]);

  useEffect(() => {
    async function fetchTokenData() {
      // popularTokens data should replace with API call
      setTokens(popularTokens[chain]);
    }

    fetchTokenData();
  }, [chain]);

  const handleRowClick = (token: TokenData) => {
    router.push({
      pathname: `/token/${token.id}`,
      query: { token: JSON.stringify(token) },
    });
  };

  return (
    <div className="min-h-screen text-white 2xl:p-6 lg:p-5 p-4">
      <ChainSelector chain={chain} setChain={setChain} />

      {/* Token Table */}
      <div className="overflow-x-auto 2xl:my-6 lg:my-5 my-4">
        <table className="w-full bg-gray-800 text-center rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
              <th className="2xl:p-4 lg:p-3.5 p-3 text-start rounded-tl-lg min-w-[240px]">
                Token
              </th>
              <th className="2xl:p-4 lg:p-3.5 p-3 w-max">Price (USD)</th>
              <th className="2xl:p-4 lg:p-3.5 p-3 w-max">Change (1h)</th>
              <th className="2xl:p-4 lg:p-3.5 p-3 w-max">Change (24h)</th>
              <th className="2xl:p-4 lg:p-3.5 p-3 w-max">Liquidity</th>
              <th className="2xl:p-4 lg:p-3.5 p-3 rounded-tr-lg w-max">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr
                key={token.id}
                onClick={() => handleRowClick(token)}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer"
              >
                {/* Token Info */}
                <td className="2xl:p-4 lg:p-3.5 p-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={token.image}
                      alt={`${token.name} logo`}
                      className="w-8 h-8 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-1">
                        <span className="uppercase font-bold">
                          {token.symbol}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {token.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 text-start w-max">
                          Created:{" "}
                          {new Date(token.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                          {token.socials.map((social, index) => (
                            <Link
                              key={social.platform}
                              href={social.url}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className={`text-blue-400 text-sm hover:underline ${
                                index > 0
                                  ? "border-l-2 border-gray-600 pl-2"
                                  : ""
                              }`}
                            >
                              {social.platform === "twitter" && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  fill="none"
                                  className="w-4 h-4"
                                >
                                  <path
                                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                    fill="currentColor"
                                  />
                                </svg>
                              )}
                              {social.platform === "etherscan" && (
                                <Image
                                  src={"/etherscan.svg"}
                                  alt={"etherscan"}
                                  width={16}
                                  height={16}
                                />
                              )}{" "}
                              {social.platform === "solscan" && (
                                <Image
                                  src={"/solscan.png"}
                                  alt="solscan"
                                  width={16}
                                  height={16}
                                />
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="2xl:p-4 lg:p-3.5 p-3">
                  ${token.price.toLocaleString()}
                </td>

                {/* Change (1h) */}
                <td
                  className={`2xl:p-4 lg:p-3.5 p-3 ${
                    token.change1h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {token.change1h >= 0 ? "+" : ""}
                  {token.change1h.toFixed(2)}%
                </td>

                {/* Change (24h) */}
                <td
                  className={`2xl:p-4 lg:p-3.5 p-3 ${
                    token.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {token.change24h >= 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </td>

                {/* Liquidity */}
                <td className="2xl:p-4 lg:p-3.5 p-3">
                  ${token.liquidity.toLocaleString()}
                </td>

                {/* Market Cap */}
                <td className="2xl:p-4 lg:p-3.5 p-3">
                  ${token.marketCap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
