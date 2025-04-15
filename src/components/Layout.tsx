// app/components/Layout.tsx
'use client';

import { AppBar, Box, Container, CssBaseline, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import PairSelector from './PairSelector';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">BTC-USD Orderbook Dashboard</Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
      
        <Box>{children}</Box>
      </Container>
    </>
  );
}
