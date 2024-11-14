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
  socials: Social[];
};

export type PopularTokens = {
  [key: string]: TokenData[];
};
