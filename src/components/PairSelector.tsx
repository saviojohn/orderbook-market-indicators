"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { useTradingPair } from "@/app/context/TradingPairContext";

const tradingPairs = ["btcusdt", "ethusdt", "xrpusdt"];

export default function PairSelector() {
  const { pair, setPair } = useTradingPair();

  return (
    <Box sx={{ my: 2 }}>
      <Tabs
        value={pair}
        onChange={(_, newValue) => setPair(newValue)}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        {tradingPairs.map((symbol) => (
          <Tab key={symbol} label={symbol.toUpperCase()} value={symbol} />
        ))}
      </Tabs>
    </Box>
  );
}
