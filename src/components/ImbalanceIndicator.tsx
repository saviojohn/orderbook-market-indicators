// app/components/ImbalanceIndicator.tsx
'use client';

import { useBinanceDepth } from '@/lib/useBinanceDepth';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useMemo } from 'react';

function calcTotalVolume(orders: [string, string][]) {
  return orders.reduce((sum, [_, qty]) => sum + parseFloat(qty), 0);
}

export default function ImbalanceIndicator() {
  const { bids, asks } = useBinanceDepth();

  const imbalance = useMemo(() => {
    const bidVolume = calcTotalVolume(bids);
    const askVolume = calcTotalVolume(asks);
    const ratio = bidVolume + askVolume === 0 ? 0.5 : bidVolume / (bidVolume + askVolume);
    return Math.round(ratio * 100); // as a percentage
  }, [bids, asks]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Orderbook Imbalance
      </Typography>
      <Typography variant="body2" gutterBottom>
        {imbalance}% Buy-side Dominance
      </Typography>
      <LinearProgress
        variant="determinate"
        value={imbalance}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: '#ffcdd2',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#4caf50',
          },
        }}
      />
    </Box>
  );
}
