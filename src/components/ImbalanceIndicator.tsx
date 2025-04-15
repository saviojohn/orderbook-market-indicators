"use client";

import { Box, Typography, LinearProgress } from "@mui/material";
import { useBinanceDepth } from "@/lib/useBinanceDepth";
import { useMemo } from "react";

export default function ImbalanceIndicator() {
  const { bids, asks } = useBinanceDepth();

  const imbalance = useMemo(() => {
    if (!bids.length || !asks.length) return null;

    const totalBid = bids.reduce(
      (acc, [ qty]) => acc + parseFloat(qty),
      0
    );
    const totalAsk = asks.reduce(
      (acc, [ qty]) => acc + parseFloat(qty),
      0
    );
    const ratio = totalBid / (totalBid + totalAsk);

    return {
      ratio: ratio * 100,
      bid: totalBid,
      ask: totalAsk,
    };
  }, [bids, asks]);

  if (!imbalance) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Orderbook Imbalance
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography color="success.main">
          Bids: {imbalance.bid.toFixed(2)}
        </Typography>
        <Typography color="error.main">
          Asks: {imbalance.ask.toFixed(2)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={imbalance.ratio}
        sx={{
          height: 20,
          borderRadius: 2,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#4caf50",
          },
        }}
      />
      <Typography variant="body2" align="center" mt={1}>
        {imbalance.ratio.toFixed(1)}% Buy Side /{" "}
        {(100 - imbalance.ratio).toFixed(1)}% Sell Side
      </Typography>
    </Box>
  );
}
