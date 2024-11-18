import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { TokenData } from "@/types/TokenTypes";
import { useApp } from "@/providers/app";
import SocialLinks from "@/app/components/SocialLinks";
import { formatPrice } from "@/utils/priceFormatting";
import { formatNumericAmountCompact } from "@/utils/formatting";

interface TableProps {
  tokens: TokenData[];
}

export default function Table({ tokens }: TableProps) {
  const { setTokenData } = useApp();
  const router = useRouter();
  const handleRowClick = (token: TokenData) => {
    setTokenData(token);
    router.push(`/token/${token.id}`);
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-200 dark:bg-gray-800 text-center rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase text-sm">
            <th className="2xl:p-4 lg:p-3.5 p-3 text-start rounded-tl-lg min-w-[240px]">
              Token
            </th>
            <th className="2xl:p-4 lg:p-3.5 p-3 whitespace-nowrap">
              Price (USD)
            </th>
            <th className="2xl:p-4 lg:p-3.5 p-3 whitespace-nowrap">
              Change (1h)
            </th>
            <th className="2xl:p-4 lg:p-3.5 p-3 whitespace-nowrap">
              Change (24h)
            </th>
            <th className="2xl:p-4 lg:p-3.5 p-3 whitespace-nowrap">
              Liquidity
            </th>
            <th className="2xl:p-4 lg:p-3.5 p-3 rounded-tr-lg whitespace-nowrap">
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr
              key={token.id}
              onClick={() => handleRowClick(token)}
              className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer"
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
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {token.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 text-start w-max">
                        Created:{" "}
                        {new Date(token.createdAt).toLocaleDateString()}
                      </span>
                      <div className="flex space-x-2">
                        <SocialLinks socials={token.socials} />
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              {/* Price */}
              <td className="2xl:p-4 lg:p-3.5 p-3">
                ${formatPrice(token.price)}
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
                {formatNumericAmountCompact(token.liquidity.toString())}
              </td>

              {/* Market Cap */}
              <td className="2xl:p-4 lg:p-3.5 p-3">
                {formatNumericAmountCompact(token.marketCap.toString())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
