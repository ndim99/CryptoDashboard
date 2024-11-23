import ChainSelector from "@/components/ChainSelector";
import React, { useState, useEffect } from "react";
import { popularTokens } from "@/data/popularTokens";
import { TokenData } from "@/types/TokenTypes";
import Container from "@/components/Container";
import Table from "@/components/Table";

export default function Dashboard() {
  const [chain, setChain] = useState("ethereum");
  const [tokens, setTokens] = useState<TokenData[]>([]);

  useEffect(() => {
    async function fetchTokenData() {
      // popularTokens data should replace with API call
      setTokens(popularTokens[chain]);
    }

    fetchTokenData();
  }, [chain]);

  return (
    <Container>
      <ChainSelector chain={chain} setChain={setChain} />
      <Table tokens={tokens} />
    </Container>
  );
}
