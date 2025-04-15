"use client";

import { Box, Typography, Skeleton, Alert, Fade } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer, 
} from "recharts";
import { useEffect, useState } from "react";
import { useBinanceDepth } from '@/lib/useBinanceDepth';

type SpreadPoint = {
  time: string;
  spread: number;
};

export default function SpreadChart() {
  const { bids, asks, error } = useBinanceDepth();
  const [data, setData] = useState<SpreadPoint[]>([]);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!bids.length || !asks.length) return;
  
    const bestBid = parseFloat(bids[0][0]);
    const bestAsk = parseFloat(asks[0][0]);
    const spread = parseFloat((bestAsk - bestBid).toFixed(2));
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
  
    setHasStarted(true);
  
    setData((prev) => {
      const updated = [...prev, { time: timestamp, spread }];
      return updated.length > 60 ? updated.slice(-60) : updated;
    });
  }, [bids, asks]);
  

  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        1-Minute Spread Chart
      </Typography>

      {!hasStarted || data.length < 10 ? (
        <Skeleton
          variant="rectangular"
          height={300}
          animation="wave"
          sx={{ borderRadius: 2 }}
        />
      ) : (
        <Fade in={data.length >= 10} timeout={500}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" minTickGap={20} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="spread"
              stroke="#8884d8"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
        </Fade>
      )}
    </Box>
  );
}
