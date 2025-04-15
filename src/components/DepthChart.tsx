"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";
import { useBinanceDepth } from "@/lib/useBinanceDepth";
import { useMemo } from "react";

type DepthData = {
  price: number;
  bidVolume?: number;
  askVolume?: number;
};

export default function DepthChart() {
  const { bids, asks } = useBinanceDepth();

  const depthData = useMemo(() => {
    const data: DepthData[] = [];

    let cumBid = 0;
    let cumAsk = 0;

    const bidPoints = bids
      .map(([price, qty]) => [parseFloat(price), parseFloat(qty)])
      .sort((a, b) => b[0] - a[0]); // high to low

    const askPoints = asks
      .map(([price, qty]) => [parseFloat(price), parseFloat(qty)])
      .sort((a, b) => a[0] - b[0]); // low to high

    for (const [price, qty] of bidPoints) {
      cumBid += qty;
      data.unshift({ price, bidVolume: cumBid }); // insert from bottom
    }

    for (const [price, qty] of askPoints) {
      cumAsk += qty;
      data.push({ price, askVolume: cumAsk });
    }

    return data;
  }, [bids, asks]);

  if (!depthData.length) return null;

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h6" gutterBottom>
        Market Depth
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={depthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="price" type="number" domain={["auto", "auto"]} />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Area
            type="stepAfter"
            dataKey="bidVolume"
            stroke="#4caf50"
            fill="#4caf50"
            fillOpacity={0.3}
          />
          <Area
            type="stepAfter"
            dataKey="askVolume"
            stroke="#f44336"
            fill="#f44336"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
