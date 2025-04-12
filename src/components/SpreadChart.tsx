'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useEffect, useState, useRef } from 'react';
import { useBinanceDepth } from '@/lib/useBinanceDepth';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';

type SpreadPoint = { time: string; spread: number };

export default function SpreadChart() {
  const { bids, asks, loading, error } = useBinanceDepth();
  const [data, setData] = useState<SpreadPoint[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!bids.length || !asks.length) return;

    const bestBid = parseFloat(bids[0][0]);
    const bestAsk = parseFloat(asks[0][0]);
    const spread = parseFloat((bestAsk - bestBid).toFixed(2));
    const now = new Date();
    const timestamp = now.toLocaleTimeString();

    setData((prev) => {
      const updated = [...prev, { time: timestamp, spread }];
      return updated.length > 60 ? updated.slice(-60) : updated;
    });
  }, [bids, asks]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        1-Minute Spread Chart
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" minTickGap={20} />
          <YAxis domain={['auto', 'auto']} />
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
    </Box>
  );
}
