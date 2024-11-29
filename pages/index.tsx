import ChainSelector from "@/components/ChainSelector";
import React, { useState, useEffect } from "react";
import { popularTokens } from "@/data/popularTokens";
import { TokenData } from "@/types/TokenTypes";
import Container from "@/components/Container";
import Table from "@/components/Table";

export default function Dashboard() {
  const [chain, setChain] = useState("ethereum");
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokenData() {
      setLoading(true);
      // popularTokens data should replace with API call
      setTokens(popularTokens[chain]);
      setLoading(false);
    }

    fetchTokenData();
  }, [chain]);

  return (
    <Container>
      <ChainSelector chain={chain} setChain={setChain} />
      {loading ? (
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-800 h-screen rounded-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <Table tokens={tokens} />
      )}
    </Container>
  );
}
