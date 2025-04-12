// app/components/DepthChart.tsx
'use client';

import { useBinanceDepth } from '@/lib/useBinanceDepth';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';

export default function DepthChart() {
  const { bids, asks } = useBinanceDepth();

  const data = useMemo(() => {
    const cumulative = { bids: [], asks: [] as any[] };

    let cumBidVol = 0;
    for (let i = bids.length - 1; i >= 0; i--) {
      cumBidVol += parseFloat(bids[i][1]);
      cumulative.bids.unshift({
        price: parseFloat(bids[i][0]),
        volume: cumBidVol,
        type: 'Bid',
      });
    }

    let cumAskVol = 0;
    for (let i = 0; i < asks.length; i++) {
      cumAskVol += parseFloat(asks[i][1]);
      cumulative.asks.push({
        price: parseFloat(asks[i][0]),
        volume: cumAskVol,
        type: 'Ask',
      });
    }

    return [...cumulative.bids, ...cumulative.asks];
  }, [bids, asks]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Market Depth (Snapshot)
      </Typography>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="price" type="number" domain={['dataMin', 'dataMax']} />
            <YAxis dataKey="volume" />
            <Tooltip />
            <Area type="monotone" dataKey="volume" data={data.filter(d => d.type === 'Bid')} stroke="#00c853" fill="#00c853" />
            <Area type="monotone" dataKey="volume" data={data.filter(d => d.type === 'Ask')} stroke="#d50000" fill="#d50000" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Box>
  );
}
