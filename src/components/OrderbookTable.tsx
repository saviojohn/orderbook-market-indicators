'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import { useBinanceDepth } from '@/lib/useBinanceDepth';
import { CircularProgress, Alert } from '@mui/material';

export default function OrderbookTable() {
  const { bids, asks, loading, error } = useBinanceDepth();
  
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Orderbook (Top 10 Bids / Asks)
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'green' }}>Bid Price</TableCell>
              <TableCell sx={{ color: 'green' }}>Bid Quantity</TableCell>
              <TableCell sx={{ color: 'red' }}>Ask Price</TableCell>
              <TableCell sx={{ color: 'red' }}>Ask Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell sx={{ color: 'green' }}>{bids[i]?.[0]}</TableCell>
                <TableCell sx={{ color: 'green' }}>{bids[i]?.[1]}</TableCell>
                <TableCell sx={{ color: 'red' }}>{asks[i]?.[0]}</TableCell>
                <TableCell sx={{ color: 'red' }}>{asks[i]?.[1]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
