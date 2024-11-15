import { Time } from "lightweight-charts";

export type Social = {
  platform: string;
  url: string;
};

export type TokenData = {
  id: string;
  name: string;
  image: string;
  symbol: string;
  price: number;
  change1h: number;
  change24h: number;
  liquidity: number;
  marketCap: number;
  createdAt: string;
  volume: number;
  supply: number;
  holders: number;
  socials: Social[];
  chartData: ChartDataPoint[];
};

export type PopularTokens = {
  [key: string]: TokenData[];
};

export type ChartDataPoint = {
  time: Time;
  value: number;
};
