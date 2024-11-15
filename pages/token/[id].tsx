import WalletPerformanceChart from "@/app/components/Chart";
import SocialLinks from "@/app/components/SocialLinks";
import TokenDetailItem from "@/app/components/TokenDetailItem";
import { useApp } from "@/providers/app";
import { formatNumericAmountCompact } from "@/utils/formatting";
import { formatPrice } from "@/utils/priceFormatting";
import Image from "next/image";

export default function TokenDetails() {
  const { tokenData } = useApp();

  if (!tokenData) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        Loading token data...
      </div>
    );
  }

  const priceChangeClass =
    (tokenData.change24h as number) >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex flex-col 2xl:gap-6 lg:gap-5 gap-4 2xl:p-6 lg:p-5 p-4 text-white">
      <div className="flex flex-wrap p-4 border border-gray-700 rounded-lg gap-4 items-center justify-between bg-gray-700">
        <div className="flex items-center gap-2">
          <Image
            src={tokenData.image as string}
            alt={`${tokenData.symbol} logo`}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="uppercase font-bold">{tokenData.symbol}</span>
              <span className="text-gray-400 text-sm">{tokenData.name}</span>
            </div>
            <SocialLinks socials={tokenData.socials} />
          </div>
        </div>

        {/* Token Details */}
        <TokenDetailItem
          label="Price (USD)"
          value={`$${formatPrice(tokenData.price)}`}
        />
        <TokenDetailItem
          label="(1H) Price Change %"
          value={`${
            (tokenData.change1h as number) >= 0 ? "+" : ""
          }${tokenData.change1h.toFixed(2)}%`}
          className={priceChangeClass}
        />
        <TokenDetailItem
          label="(24H) Price Change %"
          value={`${
            (tokenData.change24h as number) >= 0 ? "+" : ""
          }${tokenData.change24h.toFixed(2)}%`}
          className={priceChangeClass}
        />
        <TokenDetailItem
          label="Liquidity"
          value={formatNumericAmountCompact(tokenData.liquidity.toString())}
        />
        <TokenDetailItem
          label="24H Volume"
          value={formatNumericAmountCompact(tokenData.volume.toString())}
        />
        <TokenDetailItem
          label="Total Supply"
          value={formatNumericAmountCompact(tokenData.supply.toString())}
        />
        <TokenDetailItem
          label="Holders"
          value={formatNumericAmountCompact(tokenData.holders.toString())}
        />
      </div>
      <WalletPerformanceChart data={tokenData?.chartData} />
    </div>
  );
}
