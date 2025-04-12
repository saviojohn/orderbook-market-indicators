// app/components/PairSelector.tsx
'use client';

import { useTradingPair } from '@/app/context/TradingPairContext';
import { FormControl, InputLabel, MenuItem, Select, Box } from '@mui/material';

const pairs = ['btcusdt', 'ethusdt', 'xrpusdt'];

export default function PairSelector() {
  const { pair, setPair } = useTradingPair();

  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="pair-select-label">Trading Pair</InputLabel>
        <Select
          labelId="pair-select-label"
          value={pair}
          label="Trading Pair"
          onChange={(e) => setPair(e.target.value)}
        >
          {pairs.map((p) => (
            <MenuItem key={p} value={p}>
              {p.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
