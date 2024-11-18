import WalletPerformanceChart from "@/app/components/Chart";
import Container from "@/app/components/Container";
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
      <div className="min-h-screen bg-gray-900 text-black dark:text-white 2xl:p-5 lg:p-4 p-3">
        Loading token data...
      </div>
    );
  }

  const priceChangeClass = (interval: number) =>
    interval >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Container>
      <div className="flex flex-wrap p-4 border border-gray-300 dark:border-gray-600 rounded-lg 2xl:gap-4 gap-3 items-center justify-between bg-gray-300 dark:bg-gray-700">
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
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                {tokenData.name}
              </span>
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
          className={priceChangeClass(tokenData.change1h)}
        />
        <TokenDetailItem
          label="(24H) Price Change %"
          value={`${
            (tokenData.change24h as number) >= 0 ? "+" : ""
          }${tokenData.change24h.toFixed(2)}%`}
          className={priceChangeClass(tokenData.change24h)}
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
    </Container>
  );
}
