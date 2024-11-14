import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface TokenData {
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
  socials: { platform: string; url: string }[];
}

export default function TokenDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [token, setToken] = useState<TokenData | null>(null);

  useEffect(() => {
    if (router.query.token) {
      setToken(JSON.parse(router.query.token as string));
    }
  }, [router.query.token]);

  if (!token) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold">{token.name} Details</h1>
      {/* Display detailed token info */}
      <p>Symbol: {token.symbol}</p>
      <p>Price: ${token.price}</p>
      {/* Add more token details as needed */}
    </div>
  );
}
